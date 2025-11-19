/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.0.1
 */

/**
 * Polyfill to mock the alarm API from browser extension
 */
export default class AlarmsPolyfill {
  /**
   * Create a new MockAlarms object.
   */
  constructor() {
    this._registeredAlarms = {};
    this._timeouts = {};
    this._intervals = {};
    this.onAlarm = new OnAlarmEvent();
    this.onAlarm.triggerAlarm = this.onAlarm.triggerAlarm.bind(this);
  }

  /**
   * Create a new alarm.
   * @param {string} alarmName - The name of the alarm.
   * @param {object} options - The options of the alarm.
   */
  async create(alarmName, options) {
    if (!options.periodInMinutes && options.when) { // is a single alarm call
      this._createTimeout(alarmName, options);
    } else if (options.periodInMinutes && options.when) { // is a repeated alarm starting at a given timestamp
      this._createDelayedInterval(alarmName, options);
    } else if (options.periodInMinutes && options.delayInMinutes) { // is a repeated alarm start after a delay
      this._createDelayedInterval(alarmName, options);
    } else if (options.periodInMinutes) { // is a repeated alarm where counter start immediately
      this._createInterval(alarmName, options);
    }
  }

  /**
   * Creates an alarm that triggers only once using a setTimeout under the hood.
   * @param {string} alarmName the name of the alarm passed as the callback parameter when the alarm triggers
   * @param {object} options the options to define when the alarm triggers and at which frequency
   * @private
   */
  _createTimeout(alarmName, options) {
    let scheduledTime = options.when;
    if (!scheduledTime && options.delayInMinutes) {
      scheduledTime = Date.now() + options.delayInMinutes * 60_000;
    }

    const alarm = {
      name: alarmName,
      scheduledTime: scheduledTime,
    };

    const triggerDelay = alarm.scheduledTime - Date.now();

    this._registeredAlarms[alarmName] = alarm;
    const timeout = setTimeout(() => this.onAlarm.triggerAlarm(alarm), triggerDelay);
    this._timeouts[alarmName] = timeout;
  }

  /**
   * Creates a repeating alarm that triggers every `options.periodInMinutes` minute using a setInterval.
   * @param {string} alarmName the name of the alarm passed as the callback parameter when the alarm triggers
   * @param {object} options the options to define when the alarm triggers and at which frequency
   * @private
   */
  _createInterval(alarmName, options) {
    const alarm = {
      name: alarmName,
      periodInMinutes: options.periodInMinutes,
    };

    const triggerDelay = options.periodInMinutes * 60_000;

    this._registeredAlarms[alarmName] = alarm;
    const timeout = setInterval(() => this.onAlarm.triggerAlarm(alarm), triggerDelay);
    this._interval[alarmName] = timeout;
  }

  /**
   * Creates a repeating alarm that triggers every `options.periodInMinutes` minute after a given delay or starting from the given `options.when` timestamp.
   * It uses first a setTimeout as the call is delay then a setInterval takes the relay to do the repeating part.
   * @param {string} alarmName the name of the alarm passed as the callback parameter when the alarm triggers
   * @param {object} options the options to define when the alarm triggers and at which frequency
   * @private
   */
  _createDelayedInterval(alarmName, options) {
    let scheduledTime = options.when;
    if (!scheduledTime && options.delayInMinutes) {
      scheduledTime = Date.now() + options.delayInMinutes * 60_000;
    }

    const alarm = {
      name: alarmName,
      periodInMinutes: options.periodInMinutes,
      scheduledTime: scheduledTime,
    };

    this._registeredAlarms[alarmName] = alarm;
    const periodInMinutes = options.periodInMinutes;

    const firstTrigger = setTimeout(() => {
      this.onAlarm.triggerAlarm(alarm);

      // after the first delayed trigger of the series for this alarm we create a regular interval trigger
      const interval = setInterval(() => this.onAlarm.triggerAlarm(alarm), periodInMinutes * 60_000);
      this._intervals[alarmName] = interval;
    }, alarm.scheduledTime - Date.now());

    this._timeouts[alarmName] = firstTrigger;
  }

  /**
   * Get an alarm by its name.
   * @param {string} alarmName - The name of the alarm.
   * @return {object|null} The alarm or null if it doesn't exist.
   */
  async get(alarmName) {
    return this._registeredAlarms[alarmName] || null;
  }

  /**
   * Get all alarms.
   * @return {Array<object>} The list of all alarms.
   */
  async getAll() {
    return Object.values(this._registeredAlarms);
  }

  /**
   * Clear an alarm by its name.
   * @param {string} alarmName - The name of the alarm.
   */
  async clear(alarmName) {
    clearTimeout(this._timeouts[alarmName]);
    delete this._timeouts[alarmName];
    delete this._registeredAlarms[alarmName];
  }

  /**
   * Clear all alarms.
   */
  async clearAll() {
    for (const timeoutId of Object.values(this._timeouts)) {
      clearTimeout(timeoutId);
    }
    this._timeouts = {};
    this._registeredAlarms = {};
  }
}

/**
 * Class representing an alarm event.
 */
export class OnAlarmEvent {
  /**
   * Create a new OnAlarmEvent object.
   */
  constructor() {
    this._listeners = [];
    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.hasListener = this.hasListener.bind(this);
    this.triggerAlarm = this.triggerAlarm.bind(this);
  }

  /**
   * Add an alarm listener.
   * @param {function} callback - The listener function.
   */
  addListener(callback) {
    //Remove duplicate listener to avoid infinite loop in desktop app
    this.removeListener(callback);
    this._listeners.push(callback);
  }

  /**
   * Remove an alarm listener.
   * @param {function} callback - The listener function.
   */
  removeListener(callback) {
    if (!this.hasListener(callback)) {
      return;
    }
    this._listeners = this._listeners.filter(listener => listener !== callback);
  }

  /**
   * Check if an alarm listener exists.
   * @param {function} callback - The listener function.
   * @return {boolean} True if the listener exists, false otherwise.
   */
  hasListener(callback) {
    return this._listeners.includes(callback);
  }

  /**
   * Trigger an alarm.
   * @param {object} alarm - The alarm to trigger.
   */
  triggerAlarm(alarm) {
    this._listeners.forEach(callback => callback(alarm));
  }
}

window.chrome.alarms = new AlarmsPolyfill();
