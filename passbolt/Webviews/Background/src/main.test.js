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
 * @since         0.0.1
 */

import Main from "./main";

describe("Main class", () => {
    it("should receive IPC Message from webview", () => {
     // create a mock `webview` object and add the event listener to it
      const webview = {
        addEventListener: jest.fn(),
      };

      window.chrome = {
        webview: webview,
      };


      const main = new Main(window.chrome.webview);
      jest.spyOn(main, "onMessageReceived");
  
      // create a mock `event` object to simulate a message event
      const event = {
        type: "message",
        data: "hello world",
      };
  
      // fire the message event by calling the event listener with the mock event object
      webview.addEventListener.mock.calls[0][1](event);
  
      // assert that `console.log` was called with the expected argument
      expect(main.onMessageReceived).toHaveBeenCalledWith(event);
    });
  });
  
  
  
  