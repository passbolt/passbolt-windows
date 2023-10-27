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

import {v4 as uuidv4} from "uuid";

class IPCHandler {
  constructor() {
    this._port = {name: "main", sender: {tab: 0}};
    this._listeners = {};
    this.initListener();
  }

  /**
   * Init listener
   * @private
   */
  initListener() {
    window.chrome.webview.addEventListener("message", event => {
      if (event) {
        console.log(event)
        this._onMessage(event);
      }
    });
  }


  /**
   * When a message is received on the ICP channel
   * Triggers all the callback associated with that message name
   *
   * @param json
   * @private
   */
  _onMessage(json) {
    const event = json.data;
    const eventName = event.topic ? event.topic : event.requestId;
    if (Array.isArray(this._listeners[eventName])) {
      const listeners = this._listeners[eventName];
      for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        if (event.requestId) {
          const args = Array.isArray(event.message) ? [event.requestId, ...event.message] : [event.requestId, event.message];
          listener.callback.apply(this, args);
        } else if (event.status) {
          const args = Array.isArray(event.message) ? [event.status, ...event.message] : [event.status, event.message];
          listener.callback.apply(this, args);
        } else {
          listener.callback.apply(this, [event.message]);
        }
        if (listener.once) {
          this._listeners[eventName].splice(i, 1);
          // delete the listener if empty array
          if (this._listeners[eventName].length === 0) {
            delete this._listeners[eventName];
          }
          i--; // jump back since i++ is the new i
        }
      }
    }
  }

  /**
   * Add listener for a message name on the current IPC Channel
   *
   * @param name string
   * @param callback function
   * @param once bool
   * @private
   */
  _addListener(name, callback, once) {
    if (!Array.isArray(this._listeners[name])) {
      this._listeners[name] = [];
    }
    this._listeners[name].push({
      name: name,
      callback: callback,
      once: once
    });
  }

  /**
   * On message name triggers a callback
   *
   * @param name
   * @param callback
   */
  on(name, callback) {
    this._addListener(name, callback, false);
  }

  /**
   * On message name triggers a callback only once,
   * e.g. remove the listener once the message has been received
   *
   * @param name
   * @param callback
   */
  once(name, callback) {
    this._addListener(name, callback, true);
  }

  /**
   * Emit a message to the addon code
   * @param requestArgs the arguments
   */
  async emit(...requestArgs) {
    let ipc;
    if (typeof requestArgs[0] === 'string') {
      let status, message;

      if (requestArgs[1] === 'SUCCESS' || requestArgs[1] === 'ERROR') {
        status = requestArgs[1];
        const body = requestArgs.length > 2 ? requestArgs[2] : null;
        message = requestArgs[1] === 'ERROR' ? this.mapError(body) : body;
      } else {
        status = null;
        message = requestArgs[1];
      }
      ipc = {
        topic: requestArgs[0],
        status: status,
        message: message
      };
    } else {
      ipc = requestArgs[0];
    }
    window.chrome.webview.postMessage(JSON.stringify(ipc));
  }

  /**
   * Map the error message to an object
   * @param {*} error
   * @returns the error message as an object
   */
  mapError(error) {
    return {
      message: error?.message,
      name: error?.name,
      details: error?.details,
      stack: error?.stack,
    };
  }

  /**
   * Emit a request to the addon code and expect a response.
   * @param message the message
   * @param args the arguments
   * @return Promise
   */
  request(message, args) {
    // Generate a request id that will be used by the addon to answer this request.
    const requestId = uuidv4();
    // Add the requestId to the request parameters.
    const requestArgs = [{topic: message, requestId: requestId, message: args}];
    // The promise that is return when you call passbolt.request.
    return new Promise((resolve, reject) => {
      /*
       * Observe when the request has been completed.
       * Or if a progress notification is sent.
       */
      this.once(requestId, (status, ...callbackArgs) => {
        if (status === 'SUCCESS') {
          resolve.apply(null, callbackArgs);
        } else if (status === 'ERROR') {
          reject.apply(null, callbackArgs);
        }
      });
      // Emit the message to the addon-code.
      this.emit.apply(this, requestArgs);
    });
  }
}

export default IPCHandler;
