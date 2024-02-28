/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.7.0
 */

import AlarmsPolyfill from "./alarmPolyfill";

describe("Alarm Polyfill class", () => {
  let callback,
    alarms;
  const alarmName = "testAlarm";

  beforeEach(() => {
    alarms = new AlarmsPolyfill();
    callback = jest.fn();
    alarms.onAlarm.addListener(callback);
  });

  afterEach(() => {
    alarms.onAlarm.removeListener(callback);
  });

  describe("::create", () => {
    it('should create an alarm with delayInMinutes option', async() => {
      expect.assertions(4);

      await alarms.create(alarmName, {periodInMinutes: 10, delayInMinutes: 1});
      const alarm = await alarms.get(alarmName);
      expect(alarm).not.toBeNull();
      expect(alarm.name).toEqual(alarmName);
      expect(alarm.periodInMinutes).toEqual(10);
      expect(alarm.scheduledTime).toBeGreaterThanOrEqual(Date.now());
    });

    it('should create an alarm with when option', async() => {
      expect.assertions(4);

      await alarms.create(alarmName, {periodInMinutes: 10, when: 10});

      const alarm = await alarms.get(alarmName);

      expect(alarm).not.toBeNull();
      expect(alarm.name).toEqual(alarmName);
      expect(alarm.periodInMinutes).toEqual(10);
      expect(alarm.scheduledTime).toEqual(10);
    });
  });



  describe("::get", () => {
    it('should retrieve an existing alarm', async() => {
      expect.assertions(2);

      await alarms.create(alarmName, {periodInMinutes: 10, delayInMinutes: 1});
      const alarm = await alarms.get(alarmName);

      expect(alarm).not.toBeNull();
      expect(alarm.name).toEqual(alarmName);
    });

    it('should not retrieve a non existing alarm', async() => {
      expect.assertions(1);

      const alarm = await alarms.get(alarmName);

      expect(alarm).toBeNull();
    });
  });

  describe("::getAll", () => {
    it('should retrieve all existing alarm', async() => {
      expect.assertions(3);

      await alarms.create('testAlarm1', {periodInMinutes: 10, delayInMinutes: 1});
      await alarms.create('testAlarm2', {periodInMinutes: 20, delayInMinutes: 2});
      const allAlarms = await alarms.getAll();

      expect(allAlarms.length).toEqual(2);
      expect(allAlarms[0].name).toEqual('testAlarm1');
      expect(allAlarms[1].name).toEqual('testAlarm2');
    });

    it('should not retrieve a non existing alarm', async() => {
      expect.assertions(1);

      const allAlarms = await alarms.getAll(alarmName);

      expect(allAlarms).toEqual([]);
    });
  });

  describe("::clear", () => {
    it('should clear an existing alarm', async() => {
      expect.assertions(2);

      await alarms.create(alarmName, {periodInMinutes: 10, delayInMinutes: 1});
      await alarms.clear(alarmName);
      const alarm = await alarms.get(alarmName);

      expect(alarm).toBeNull();
      expect(alarms._timeouts[alarm]).toBeUndefined();
    });
  });

  describe("::clearAll", () => {
    it('should clear all existing alarms', async() => {
      expect.assertions(2);

      await alarms.create('testAlarm1', {periodInMinutes: 10, delayInMinutes: 1});
      await alarms.create('testAlarm2', {periodInMinutes: 20, delayInMinutes: 2});
      await alarms.clearAll();
      const allAlarms = await alarms.getAll();

      expect(allAlarms.length).toBe(0);
      expect(alarms._timeouts).toEqual({});
    });
  });
});
