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
 * @since         0.3.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router} from "react-router-dom";
import AppContext from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import TranslationProvider from "passbolt-styleguide/src/react-extension/components/Common/Internationalisation/TranslationProvider";
import AuthenticationLoginContextProvider from "passbolt-styleguide/src/react-extension/contexts/Authentication/AuthenticationLoginContext";
import SiteSettings from "passbolt-styleguide/src/shared/lib/Settings/SiteSettings";
import UserSettings from "passbolt-styleguide/src/shared/lib/Settings/UserSettings";
import Footer from "passbolt-styleguide/src/react-extension/components/Common/Footer/Footer";
import OrchestrateLoginBoxMain from "./components/OrchestrateLoginBoxMain";
import RenderedWebview from "./components/RenderedWebview";
import LogoSVG from "passbolt-styleguide/src/img/svg/logo.svg";

/**
 * The login application served by the browser extension.
 */
class AppAuthentication extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.defaultState(props);
  }

  async componentDidMount() {
    await this.listen();
  }

  /**
   * listen events
   */
  async listen() {
    await localStorage.clear();
    this.props.port.on("passbolt.background.is-ready", this.handleBackgroundReady);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleBackgroundReady = this.handleBackgroundReady.bind(this);
  }

  /**
   * handle the background webview to be ready
   * @param {object} data
   */
  async handleBackgroundReady() {
    this.removeSkeleton();
    await this.initializeUserSettings();
    await this.getSiteSettings();
    await this.getExtensionVersion();
    this.initLocale();
    this.setState({isReady: true});
  }

  /**
   * Remove skeleton preloaded in html if any
   */
  removeSkeleton() {
    const skeleton = document.getElementById("temporary-skeleton");
    if (skeleton) {
      skeleton.remove();
    }
  }

  /**
   * Returns the component default state
   */
  defaultState(props) {
    return {
      port: props.port, // The background page communication port
      storage: props.storage, // The storage
      siteSettings: null, // The site settings
      extensionVersion: null, // The extension version
      locale: null, // The locale
      isReady: false, // Check if component is ready to be displayed
      // Locale
      onUpdateLocaleRequested: this.onUpdateLocaleRequested.bind(this),
    };
  }

  /**
   * Initialize the user settings.
   * @returns {Promise<void>}
   */
  async initializeUserSettings() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    if (storageData._passbolt_data?.config) {
      const userSettings = new UserSettings(storageData._passbolt_data.config);
      await this.setState({userSettings});
    }
  }

  /**
   * Get the list of site settings from background page and set it in the state
   * Using SiteSettings
   */
  async getSiteSettings() {
    const settings = await this.props.port.request("passbolt.organization-settings.get");
    const siteSettings = new SiteSettings(settings);
    this.setState({siteSettings});
  }

  /**
   * Get extension version
   */
  async getExtensionVersion() {
    const extensionVersion = await this.props.port.request("passbolt.addon.get-version");
    this.setState({extensionVersion});
  }

  /**
   * Init the locale
   */
  async initLocale() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Whenever the update of the locale is requested
   */
  async onUpdateLocaleRequested() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Renders the component
   */
  render() {
    return (
      <RenderedWebview port={this.props.port}>
        {this.state.isReady && <AppContext.Provider value={this.state}>
          <TranslationProvider loadingPath="https://rendered.dist/Rendered/dist/locales/{{lng}}/{{ns}}.json">
            <Router>
              <AuthenticationLoginContextProvider>
                <div id="container" className="container page login">
                  <div className="content">
                    <div className="header">
                      <div className="logo-svg">
                        <LogoSVG role="img" width="20rem" height="3.5rem"/>
                      </div>                    
                    </div>
                    <div className="login-form">
                      <OrchestrateLoginBoxMain />
                    </div>
                  </div>
                </div>
                <Footer />
              </AuthenticationLoginContextProvider>
            </Router>
          </TranslationProvider>
        </AppContext.Provider>
        }
      </RenderedWebview>
    );
  }
}

AppAuthentication.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default AppAuthentication;
