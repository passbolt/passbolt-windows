(self["webpackChunkbackground_webview"] = self["webpackChunkbackground_webview"] || []).push([["src_main_js"],{

/***/ "./src/controllers/desktopAuthenticateController.js":
/*!**********************************************************!*\
  !*** ./src/controllers/desktopAuthenticateController.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var passbolt_browser_extension_src_all_background_page_model_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/model/config */ "./node_modules/passbolt-browser-extension/src/all/background_page/model/config.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_service_account_buildApiClientOptionsService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/service/account/buildApiClientOptionsService */ "./node_modules/passbolt-browser-extension/src/all/background_page/service/account/buildApiClientOptionsService.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_service_account_getLegacyAccountService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService */ "./node_modules/passbolt-browser-extension/src/all/background_page/service/account/getLegacyAccountService.js");
/* harmony import */ var _data_mockStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/mockStorage */ "./src/data/mockStorage.js");
/* harmony import */ var _enumerations_appEventEnumeration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enumerations/appEventEnumeration */ "./src/enumerations/appEventEnumeration.js");
/* harmony import */ var _services_loginUserService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/loginUserService */ "./src/services/loginUserService.js");
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
 * Controller related to the desktop authentication
 */
class DesktopAuthenticateController {

  /**
   * Wrapper of exec function to run.
   *
   * @return {Promise<void>}
   */
  async _exec() {
    try {
      await this.exec();
      window.chrome.webview.postMessage(JSON.stringify({ topic: _enumerations_appEventEnumeration__WEBPACK_IMPORTED_MODULE_4__.USER_LOGGED_IN }));
    } catch (error) {
      window.chrome.webview.postMessage(JSON.stringify({ topic: _enumerations_appEventEnumeration__WEBPACK_IMPORTED_MODULE_4__.ERROR, message: error }));
    }
  }

  /**
   * Attemps to sign in the current user.
   * 
   * @return {Promise<void>}
   */
  async exec() {
    await passbolt_browser_extension_src_all_background_page_model_config__WEBPACK_IMPORTED_MODULE_0__.Config.init();
    const result = await passbolt_browser_extension_src_all_background_page_service_account_getLegacyAccountService__WEBPACK_IMPORTED_MODULE_2__["default"].get();
    const apiClientOptions = await passbolt_browser_extension_src_all_background_page_service_account_buildApiClientOptionsService__WEBPACK_IMPORTED_MODULE_1__["default"].buildFromDomain(result.domain);
    const loginUserService = new _services_loginUserService__WEBPACK_IMPORTED_MODULE_5__["default"](apiClientOptions);
    await loginUserService.checkPassphrase(_data_mockStorage__WEBPACK_IMPORTED_MODULE_3__.tempPassphrase)
    await loginUserService.login(_data_mockStorage__WEBPACK_IMPORTED_MODULE_3__.tempPassphrase, true)
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesktopAuthenticateController);


/***/ }),

/***/ "./src/data/mockStorage.js":
/*!*********************************!*\
  !*** ./src/data/mockStorage.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "accountDto": () => (/* binding */ accountDto),
/* harmony export */   "tempPassphrase": () => (/* binding */ tempPassphrase)
/* harmony export */ });
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

//This is a mock for the first iteration, change it with the bext to adapt your nee

const accountDto = {
    "domain": "https://www.passbolt.local",
    "user_id": "60e6b124-9d2b-43c1-abee-427a643437b8",
    "username": "user@passbolt.com",
    "first_name": "User",
    "last_name": "User",
    "user_public_armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n" +
        "\n" +
        "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\n" +
        "=VYl3\n" +
        "-----END PGP PUBLIC KEY BLOCK-----",
    "user_private_armored_key": "-----BEGIN PGP PRIVATE KEY BLOCK-----\n" +
        "\n" +
        "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\n" +
        "Sd+Iq0thyecUADwQRKgoM0yI3sHEVLWB02g=\n" +
        "=8RNj\n" +
        "-----END PGP PRIVATE KEY BLOCK-----",
    "server_public_armored_key": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQGNBGQlllkBDAC7XH4etRHGDoiT7tLpPBGGKpuiWg7XrezrEIAtXLxGs3PO58dF\n0Xu5MmIxhqY5kbtPT1Muw8sqPt\/U9LM90buLwgbvB2bl5kly0zkpXj7lMjxVLFyL\nNpgLcW7WdAs1mv1qy5obD6vpLyVxnKyaqNbf0iYu3NVl7vg9ZuTdvXIgEgoNMSEK\nwqK2DD3zufqcAo+921OnDP4+i8t933jfmfzPhW2WaORhY8KY5yJos12zO9u6MtR3\nSyr7HhMRMcn8sUOZf6XjK+OHr9U\/ct3mVYYlLEsdF1O2mAsV1JRHKr8RKh90pVPD\nV8Fh9GoqeMzhOUcGOXPBnsVwdbaatFTexn7Z5347O2zqSGmw1KEQ\/16d7D0s3vI6\nbX1YfcZ8CbE7JghM2zRtLcg5Jkp2QrdHKwzlzkGRvgEwDGoYQsstLZtuR4S2q5dA\nqQ0XpzLVBR\/T9paWeujPQDvZZNgi6VXE\/SmYZteAK6PQiBgNUYYmgviE9cT3mClR\nATlecU8++tsHA9UAEQEAAbQvUGFzc2JvbHQgZGVmYXVsdCB1c2VyIDxwYXNzYm9s\ndEB5b3VyZG9tYWluLmNvbT6JAc4EEwEKADgWIQQ0+YNKvx\/BmKborpviPzu6MPTY\nAAUCZCWWWQIbAwULCQgHAgYVCgkICwIEFgIDAQIeAQIXgAAKCRDiPzu6MPTYADR7\nC\/9+9t5RCXK1DAJSif+zAmV1Og33s1qKsFLSr3n9AQ2xdnJibDdwQ+UOFMUjBJ\/4\nG6UbNdmvLLbrappuJVVOhsSLnwUpLRPryhmM+wUlFppr1B3B9rkleNaZMKDARTxc\nQRpaOgkgWl1WjJV3AFwKkEr5xy1iNsDR1Xkms\/QXJcdkhcVLburDFF8PJpjCnVm\/\nwGdRleh4SpiADP6lYB1oNg40TzH3E4hF4ST3NmpW8HebQmGliwGgGCjfsjCbZnMB\nZVhxX\/fruoL2c5r1XSU41bMedhXf0viLUna\/fp\/Io2Yo8KLo6Y3ATn6FpYh+kcai\nqcLUMmB8hVfCfd8Fe+nGXVzLtqC2+2vomavAjeFk2GTyWuhiu6ZYremzsmSc5Vam\nSimptcDmhGF6H5u5wNvtSTiXXBHCAl48IqvfAS+btrAv87voKop0q7rnUbhkK5Zw\nDi6k5P3dhLEoKwPThbdnXaCGftXPY1RlZ8Q9OqjH4DPsEtD+JIuujTP1w\/F5XNaZ\nIqq5AY0EZCWWWQEMAKpP8Mj9PKyE6ltO0Rkpr18\/GSWiYSp8ejIl6EcvNiP6qokq\nfdIms4NqNhAP6kvErpadlE61uttfCA6goi7YZLeuz\/AdLW7Js\/YanPo81F2qJBMW\nt2fzjFQ3RO6FRylG2ibmsxHgyS\/MVqc5HPJPORhyV8PV\/KDTARJUjhH4oBfxESrn\nqvR1efywtFkc4hn\/t3stXaqooWlYorgZKORQKNE8PE7HMfJ9FXZFf+38uxqrb9TS\nYnhy3Al2B6LzNdavhL\/IkxFIGE6Dru+mtoDn9Kmh9l7Nl7\/tAgyqiNMGHs0gl4+X\neFtwGpKCt+H7+kvsPs\/Vt5pYgTyHdiFUhJXwUQNq+nier52ouWe2ou0rNtLMIJQN\n6CF4NbK7AXckW1OkEoeWj6RY3O6SfYXne+ZqA2kApOoqqS\/ZIlZZml8cgS0iVbD6\nNOtJlOg6a6+OdRZtvjbv9dKPwtrEx\/MENrbgaMYksK7h5fE7GYb\/ZGQwhYJsPnvm\ngWjyB4T7ahNfT0e4kQARAQABiQG2BBgBCgAgFiEENPmDSr8fwZim6K6b4j87ujD0\n2AAFAmQlllkCGwwACgkQ4j87ujD02AA2igv+LAS4Qq6hfbchE9ov1ARGesrx2Uyf\nMsur6FMU8oa4owtCFgUoVYMj3uSL21nlivLIxUsGvf0XtLrLyVkiRa2hPpbNSYxs\nV3wiRgLa64ccP6+UkcTkhCf9Hhps7t8vQ8dgMAl3zYKuXgwQ0HPL04SVebFfB4HG\n4y2I1p9\/wHDgK4dw9WjnYJ8GC2X\/fllM8zZZUhNxfJMEx0VJC4HtNzQYasUJOCcd\n2Y7JM4X4\/XP1DHtW4vkDyumSEKbfASiw9wVKm\/RhErcKzFy9wMk9QTe3DpbWWgnH\n8SuwhkiulvEOAbPBpnexBCibqIrxNq0fduPA7okG7GHAoHc0z\/H76VztZrTuFPzl\nNlXslYowE\/uCgbsDtqYHXFm\/LptJNSanR2CAKOsxArx7SytFFF4qYWSECUI60gy0\nvw8lSWw\/uL\/Hri+Q5oEr8vT6hWF\/3aVm8cGon+Gw00vvv2VW0hvFxKkCa1470z2M\nWfI4g3Q3GW5s\/ZE7W4re15jQWU2TJ4Amhxao\n=cCXV\n-----END PGP PUBLIC KEY BLOCK-----\n",
    "security_token": { "code": "IEX", "color": "#607d8b", "textcolor": "#ffffff", },

}

const tempPassphrase = "user@passbolt.com"


/***/ }),

/***/ "./src/events/authEvents.js":
/*!**********************************!*\
  !*** ./src/events/authEvents.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthEvents": () => (/* binding */ AuthEvents)
/* harmony export */ });
/* harmony import */ var _controllers_desktopAuthenticateController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/desktopAuthenticateController */ "./src/controllers/desktopAuthenticateController.js");
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



const listen = function (worker) {
  /*
   * Attempt to login the current user.
   *
   * @listens passbolt.desktop.authenticate
   */
  switch (worker.topic) {
    case "passbolt.desktop.authenticate":
      const controller = new _controllers_desktopAuthenticateController__WEBPACK_IMPORTED_MODULE_0__["default"]();
      controller._exec();
      break;
    default:
      console.log(`Unsupported topic: ${worker.topic}`)
      break;
  }
}

const AuthEvents = { listen };


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _events_authEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/authEvents */ "./src/events/authEvents.js");
/* harmony import */ var _shared_IPCHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/IPCHandler */ "./src/shared/IPCHandler.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_organizationSettingsEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/organizationSettingsEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_configEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/configEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/configEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_userEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/userEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/userEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_localeEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/localeEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/localeEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_roleEvents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/roleEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/roleEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_resourceTypeEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/resourceTypeEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/resourceTypeEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_resourceEvents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/resourceEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/resourceEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_groupEvents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/groupEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/groupEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_folderEvents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/folderEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/folderEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_secretEvents__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/secretEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/secretEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_commentEvents__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/commentEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/commentEvents.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_event_actionLogEvents__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/event/actionLogEvents */ "./node_modules/passbolt-browser-extension/src/all/background_page/event/actionLogEvents.js");
/* harmony import */ var _enumerations_appEventEnumeration__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./enumerations/appEventEnumeration */ "./src/enumerations/appEventEnumeration.js");
/* harmony import */ var _services_storageService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/storageService */ "./src/services/storageService.js");
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
 * Represents the main class that sets up an event listener for the `message` event.
 * @class
 */
class Main {

    worker = null;

    /**
     * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
     * @constructor
     * @param {HTMLElement} webview - The webview element to listen for the `message` event on.
     */
    constructor(webview) {
        this.storageService = new _services_storageService__WEBPACK_IMPORTED_MODULE_15__["default"]();
        this.initStorage();
        this.worker = {port: new _shared_IPCHandler__WEBPACK_IMPORTED_MODULE_1__["default"]()};
        passbolt_browser_extension_src_all_background_page_event_organizationSettingsEvents__WEBPACK_IMPORTED_MODULE_2__.OrganizationSettingsEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_configEvents__WEBPACK_IMPORTED_MODULE_3__.ConfigEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_localeEvents__WEBPACK_IMPORTED_MODULE_5__.LocaleEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_roleEvents__WEBPACK_IMPORTED_MODULE_6__.RoleEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_resourceTypeEvents__WEBPACK_IMPORTED_MODULE_7__.ResourceTypeEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_resourceEvents__WEBPACK_IMPORTED_MODULE_8__.ResourceEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_groupEvents__WEBPACK_IMPORTED_MODULE_9__.GroupEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_userEvents__WEBPACK_IMPORTED_MODULE_4__.UserEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_folderEvents__WEBPACK_IMPORTED_MODULE_10__.FolderEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_secretEvents__WEBPACK_IMPORTED_MODULE_11__.SecretEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_commentEvents__WEBPACK_IMPORTED_MODULE_12__.CommentEvents.listen(this.worker);
        passbolt_browser_extension_src_all_background_page_event_actionLogEvents__WEBPACK_IMPORTED_MODULE_13__.ActionLogEvents.listen(this.worker);
        this.initMainCommunication(webview);
    }

    /**
     * Creates an instance of `Main` and sets up an event listener for the `message` event on the given `webview`.
     * @constructor
     * @param {HTMLElement} webview - The webview element to listen for the `message` event on.
     */
    initMainCommunication(webview) {
        webview.addEventListener("message", (ipc) => {
            _events_authEvents__WEBPACK_IMPORTED_MODULE_0__.AuthEvents.listen(ipc.data)
        });
    }

    /**
     * init the local storage with the mock data in case it does not exist
     */
    async initStorage() {
        await this.storageService.initPassboltData();
        window.chrome.webview.postMessage(JSON.stringify({ topic: _enumerations_appEventEnumeration__WEBPACK_IMPORTED_MODULE_14__.BACKGROUND_READY }));
    }
}



/***/ }),

/***/ "./src/services/loginUserService.js":
/*!******************************************!*\
  !*** ./src/services/loginUserService.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var passbolt_browser_extension_src_all_background_page_error_userAlreadyLoggedInError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/error/userAlreadyLoggedInError */ "./node_modules/passbolt-browser-extension/src/all/background_page/error/userAlreadyLoggedInError.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_model_auth_authModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/model/auth/authModel */ "./node_modules/passbolt-browser-extension/src/all/background_page/model/auth/authModel.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_model_keyring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/model/keyring */ "./node_modules/passbolt-browser-extension/src/all/background_page/model/keyring.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_service_crypto_checkPassphraseService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/service/crypto/checkPassphraseService */ "./node_modules/passbolt-browser-extension/src/all/background_page/service/crypto/checkPassphraseService.js");
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
 * Service related to the login user service
 */
class LoginUserService {

  /**
   * constructor for the login user service
   * @param {ApiClientOptions} apiClientOptions 
   */
  constructor(apiClientOptions) {
    this.authModel = new passbolt_browser_extension_src_all_background_page_model_auth_authModel__WEBPACK_IMPORTED_MODULE_1__["default"](apiClientOptions);
    this.checkPassphraseService = new passbolt_browser_extension_src_all_background_page_service_crypto_checkPassphraseService__WEBPACK_IMPORTED_MODULE_3__["default"](new passbolt_browser_extension_src_all_background_page_model_keyring__WEBPACK_IMPORTED_MODULE_2__["default"]());
  }

  /**
   * check passphrase validity
   * @param {string} passphrase 
   */
  async checkPassphrase(passphrase) {
    if (typeof passphrase === "undefined") {
      throw new Error("A passphrase is required.");
    }
    if (typeof passphrase !== "string") {
      throw new Error("The passphrase should be a string.");
    }
    if (typeof rememberMe !== "undefined" && typeof rememberMe !== "boolean") {
      throw new Error("The rememberMe should be a boolean.");
    }
    await this.checkPassphraseService.checkPassphrase(passphrase);
  }

  /**
   * sign in the user with backend
   * @param {string} passphrase 
   * @param {boolean} rememberMe 
   */
  async login(passphrase, rememberMe) {
    try {
      await this.authModel.login(passphrase, rememberMe);
    } catch (error) {
      if (!(error instanceof passbolt_browser_extension_src_all_background_page_error_userAlreadyLoggedInError__WEBPACK_IMPORTED_MODULE_0__["default"])) {
        throw error;
      }
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginUserService);


/***/ }),

/***/ "./src/services/storageService.js":
/*!****************************************!*\
  !*** ./src/services/storageService.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var passbolt_browser_extension_src_all_background_page_model_account_accountModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/model/account/accountModel */ "./node_modules/passbolt-browser-extension/src/all/background_page/model/account/accountModel.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_model_entity_account_accountEntity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity */ "./node_modules/passbolt-browser-extension/src/all/background_page/model/entity/account/accountEntity.js");
/* harmony import */ var _data_mockStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/mockStorage */ "./src/data/mockStorage.js");
/* harmony import */ var passbolt_browser_extension_src_all_background_page_sdk_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! passbolt-browser-extension/src/all/background_page/sdk/storage */ "./node_modules/passbolt-browser-extension/src/all/background_page/sdk/storage.js");
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
 * Service related to the storage service
 */
class StorageService {

    /**
     * init the passbolt configuration storage
     */
    async initPassboltData() {
        if (localStorage.getItem('_passbolt_data') === null) {
            try {
                localStorage.setItem("_passbolt_data", JSON.stringify({}))
                const accountModel = new passbolt_browser_extension_src_all_background_page_model_account_accountModel__WEBPACK_IMPORTED_MODULE_0__["default"]();
                const account = new passbolt_browser_extension_src_all_background_page_model_entity_account_accountEntity__WEBPACK_IMPORTED_MODULE_1__["default"](_data_mockStorage__WEBPACK_IMPORTED_MODULE_2__.accountDto);

                await accountModel.add(account);
            } catch (error) {
                console.error(error)
            }
        }
        await passbolt_browser_extension_src_all_background_page_sdk_storage__WEBPACK_IMPORTED_MODULE_3__["default"].init();
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StorageService);


/***/ }),

/***/ "./src/shared/IPCHandler.js":
/*!**********************************!*\
  !*** ./src/shared/IPCHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
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



class IPCHandler {

    constructor() {
        this._listeners = {};
        this.initListener();
    }

    /**
     * Init listener
     * @private
     */
    initListener() {
        window.chrome.webview.addEventListener("message", (event) => {
            this._onMessage(event);
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
                    let args = Array.isArray(event.message) ? [event.requestId, ...event.message] : [event.requestId, event.message];
                    listener.callback.apply(this, args);
                } else if (event.status) {
                    let args = Array.isArray(event.message) ? [event.status, ...event.message] : [event.status, event.message];
                    listener.callback.apply(this, args);
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
            ipc = {
                topic: requestArgs[0],
                status: requestArgs[1],
                message: requestArgs.length > 2 ? requestArgs[2] : null
            }
        } else {
            ipc = requestArgs[0];
        }
        window.chrome.webview.postMessage(JSON.stringify(ipc));
    }

    /**
     * Emit a request to the addon code and expect a response.
     * @param message the message
     * @param args the arguments
     * @return Promise
     */
    request(message, ...args) {
        // Generate a request id that will be used by the addon to answer this request.
        const requestId = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
        // Add the requestId to the request parameters.
        const requestArgs = [{ topic: message, requestId, message: args }];
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IPCHandler);


/***/ }),

/***/ "?d546":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8131":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3fc0":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?4068":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?e7e4":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?7bec":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?0aec":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?fbf1":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ed1b":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?d17e":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=src_main_js.background.js.map