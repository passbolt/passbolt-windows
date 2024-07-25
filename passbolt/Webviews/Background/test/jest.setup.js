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
