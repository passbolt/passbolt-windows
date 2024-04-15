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
 * @since         1.0.0
 */

import {buildMessage, errorTopic, requestId, successTopic, topic} from './IPCHander.test.data';
import IPCHandler from './IPCHandler';


describe('IPCHandler', () => {
  let ipcHandler;
  const mockCallback = jest.fn();

  beforeEach(() => {
    window.chrome.webview.addEventListener = jest.fn();
    ipcHandler = new IPCHandler();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("IPCHandler:on", () => {
    it('should add a listener when on is called', () => {
      expect.assertions(4);

      ipcHandler.on(topic, mockCallback);

      expect(ipcHandler._listeners[topic]).toBeDefined();
      expect(ipcHandler._listeners[topic]).toHaveLength(1);
      expect(ipcHandler._listeners[topic][0].callback).toBe(mockCallback);
      expect(ipcHandler._listeners[topic][0].once).toBeFalsy();
    });
  });

  describe("IPCHandler:once", () => {
    it('should add a listener that only triggers once when once is called', () => {
      expect.assertions(4);

      ipcHandler.once(topic, mockCallback);

      expect(ipcHandler._listeners[topic]).toBeDefined();
      expect(ipcHandler._listeners[topic]).toHaveLength(1);
      expect(ipcHandler._listeners[topic][0].callback).toBe(mockCallback);
      expect(ipcHandler._listeners[topic][0].once).toBeTruthy();
    });
  });

  describe("IPCHandler:emit", () => {
    it('should emit function sends message via postMessage', async() => {
      expect.assertions(1);

      await ipcHandler.emit(topic, successTopic.status, successTopic.message);

      expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify(successTopic));
    });


    it('should correctly form ipc for topic and message', async() => {
      expect.assertions(1);

      await ipcHandler.emit(topic, successTopic.message);

      expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({
        topic: topic,
        status: null,
        message: successTopic.message,
      }));
    });

    it('should pass the raw requestArgs if the first argument is not a string', async() => {
      expect.assertions(1);

      const data = {some: 'data'};
      await ipcHandler.emit(data);

      expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('should correctly form ipc for topic and SUCCESS status', async() => {
      expect.assertions(1);

      await ipcHandler.emit(topic, 'SUCCESS');

      expect(window.chrome.webview.postMessage).toHaveBeenCalledWith(JSON.stringify({
        topic: topic,
        status: 'SUCCESS',
        message: null
      }));
    });
  });

  describe("IPCHandler:request", () => {
    it('should request function emits request and registers one-time listener for response', () => {
      expect.assertions(4);

      const spy = jest.spyOn(ipcHandler, 'emit');
      ipcHandler.request(topic, mockCallback);
      const requestId = Object.keys(ipcHandler._listeners)[0];

      expect(ipcHandler._listeners[requestId]).toBeDefined();
      expect(ipcHandler._listeners[requestId]).toHaveLength(1);
      expect(ipcHandler._listeners[requestId][0].once).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
    it('should request generates a requestId and adds it to the request parameters', async() => {
      expect.assertions(1);

      const mockCallback = jest.fn();
      const mockCallbackArgs = ['testArg1', 'testArg2'];
      const spy = jest.spyOn(ipcHandler, '_addListener');

      ipcHandler.request({message: topic}, mockCallback, ...mockCallbackArgs);
      const requestId = Object.keys(ipcHandler._listeners)[0];

      expect(spy).toHaveBeenCalledWith(requestId, expect.any(Function), true);
    });


    it('should request resolve in case of status is success', async() => {
      expect.assertions(1);

      const promise = ipcHandler.request({message: topic});
      const requestId = Object.keys(ipcHandler._listeners)[0];
      ipcHandler._onMessage({data: {topic: requestId, status: successTopic.status, message: successTopic.message}});

      expect(await promise).toBe(successTopic.message);
    });

    it('should request reject in case of status is error', async() => {
      expect.assertions(1);

      const promise = ipcHandler.request({message: topic});
      const requestId = Object.keys(ipcHandler._listeners)[0];

      ipcHandler._onMessage({data: {topic: requestId, status: errorTopic.status, message: errorTopic.message}});

      try {
        await promise;
      } catch (error) {
        expect(error).toEqual(errorTopic.message);
      }
    });
  });

  describe("IPCHandler:initListener", () => {
    it('should register a message topic listener on chrome.webview with initListener', () => {
      expect.assertions(1);
      expect(window.chrome.webview.addEventListener).toHaveBeenCalledWith("message", expect.any(Function));
    });
  });

  describe("IPCHandler:_onMessage", () => {
    it('_onMessage triggers registered callbacks with correct arguments', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();
      ipcHandler.on(topic, mockCallback);
      ipcHandler._onMessage(buildMessage(successTopic, requestId));

      expect(mockCallback).toHaveBeenCalledWith(requestId, successTopic.message);
    });

    it('_onMessage removes once listener after first trigger', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();
      ipcHandler.once(topic, mockCallback);
      ipcHandler._onMessage(buildMessage(successTopic, requestId));

      expect(ipcHandler._listeners[topic]).toBeUndefined();
    });
  });

  describe("IPCHandler:_addListener", () => {
    it('_addListener adds listener object to listeners', () => {
      expect.assertions(4);

      ipcHandler._addListener(topic, mockCallback, false);

      expect(ipcHandler._listeners[topic]).toBeDefined();
      expect(ipcHandler._listeners[topic]).toHaveLength(1);
      expect(ipcHandler._listeners[topic][0].callback).toBe(mockCallback);
      expect(ipcHandler._listeners[topic][0].once).toBeFalsy();
    });
  });
});

