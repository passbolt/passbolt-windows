import "passbolt-browser-extension/test/mocks/mockJsDomPolyfill";
import "passbolt-browser-extension/test/mocks/mockCryptoKey";
import MockNavigatorLocks from 'passbolt-browser-extension/test/mocks/mockNavigatorLocks';
import MockNavigatorClipboard from 'passbolt-browser-extension/test/mocks/mockNavigatorClipboard';
import "./polyfill/chromePolyfill"
import "../src/polyfill/alarmPolyfill"
import "../src/polyfill/commandPolyfill"
import "../src/polyfill/desktopPolyfill"
import "../src/polyfill/runtimePolyfill"
import "../src/polyfill/storagePolyfill"
import "../src/polyfill/sessionStoragePolyfill"

global.TextEncoder = require('text-encoding-utf-8').TextEncoder;
global.TextDecoder = require('text-encoding-utf-8').TextDecoder;
global.fetch = require('node-fetch');

window.chrome.webview = {
  postMessage: jest.fn(),
  addEventListener: jest.fn((event, callback) => {
    if (event === "message") {
      callback()
    }
  })  
}
window.chrome.webview.desktop = true;
window.chrome.runtime = {
  id: {},
  lastError: null,
  getManifest: () => ({ manifest_version: 0 })
};

global.chrome = window.chrome;
global.browser = window.chrome;
if (!global.navigator) {
  global.navigator = {};
}
if (!global.navigator.locks) {
  global.navigator.locks = new MockNavigatorLocks();
}
navigator.onLine = true;

if (!global.navigator.clipboard) {
  global.navigator.clipboard = new MockNavigatorClipboard();
}
global.document = window.document