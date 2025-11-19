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

(function() {
  class Stylesheet {
    constructor() {
      this.init();
    }

    async init() {
      await this.updateStylesWithUserPreferences();
      this.handleStorageChange = this.handleStorageChange.bind(this);

      addEventListener("storage", event => {
        const changes = {};
        const key = event.key;
        changes[key] = event.newValue;
        this.handleStorageChange(changes);
      });
    }

    async updateStylesWithUserPreferences() {
      const cssInfoTag = document.querySelector('#stylesheet-manager');
      if (!cssInfoTag) {
        return;
      }

      this.theme = await this.getTheme();
      const cssFile = cssInfoTag.dataset.file;

      this.getLinkTag().setAttribute("href", `https://rendered.dist/Rendered/dist/themes/${this.theme}/${cssFile}`);
    }

    async getStorage(key) {
      const value = localStorage.getItem(key);
      return {
        [key]: JSON.parse(value)
      };
    }

    getLinkTag() {
      let link = document.querySelector("#stylesheet");
      if (link) {
        return link;
      }

      link = document.createElement("link");
      link.setAttribute("id", "stylesheet");
      link.setAttribute("media", "all");
      link.setAttribute("rel", "stylesheet");

      document.querySelector("head").appendChild(link);

      return link;
    }

    handleStorageChange(changes) {
      if (changes?._passbolt_data) {
        let newValue;
        try {
          newValue = JSON.parse(changes?._passbolt_data);
        } catch (error) {
          console.error(error);
        }
        if (newValue?.config) {
          const config = newValue?.config;
          if (config && this.theme !== config["user.settings.theme"] && this.isValidTheme(config["user.settings.theme"])) {
            this.theme = config["user.settings.theme"];
            this.updateStylesWithUserPreferences();
          }
        }
      }
    }

    async getLocalStorage() {
      return this.getStorage(["_passbolt_data"]);
    }

    async getTheme() {
      if (await this.isThemeDefined()) {
        const storageData = await this.getLocalStorage();
        const {_passbolt_data: {config}} = storageData;
        return config["user.settings.theme"];
      }

      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? "midgar"
        : "default";
    }

    async isThemeDefined() {
      const storageData = await this.getLocalStorage();
      if (!storageData || !storageData._passbolt_data) {
        return false;
      }

      const {_passbolt_data: {config}} = storageData;
      const keyExists = config && "user.settings.theme" in config;
      return keyExists && this.isValidTheme(config["user.settings.theme"]);
    }

    isValidTheme(theme) {
      const whitelist = ['default', 'midgar', 'solarized_light', 'solarized_dark'];
      return whitelist.includes(theme);
    }
  }

  new Stylesheet();
})();
