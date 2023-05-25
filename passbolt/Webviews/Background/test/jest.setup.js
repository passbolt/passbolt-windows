import MockStorage from 'passbolt-browser-extension/src/all/background_page/sdk/storage.test.mock';
import MockAlarms from 'passbolt-browser-extension/test/mocks/mockAlarms';
import "./polyfill/chromePolyfill"
import "../src/polyfill/desktopPolyfill"
import "../src/polyfill/alarmPolyfill"
import "../src/polyfill/runtimePolyfill"
import "../src/polyfill/storagePolyfill"

global.TextEncoder = require('text-encoding-utf-8').TextEncoder;
global.TextDecoder = require('text-encoding-utf-8').TextDecoder;
global.fetch = require('node-fetch');
global.window = Object.create(window);

jest.mock("webextension-polyfill", () => {
  
  const polyfill = Object.assign({}, {
    storage: new MockStorage(),
    runtime: {
      id: {},
      lastError: null,
      getManifest: () => ({ manifest_version: 0 })
    },
    alarms: new MockAlarms(),
  })
  return polyfill;
});


global.chrome = window.chrome;
