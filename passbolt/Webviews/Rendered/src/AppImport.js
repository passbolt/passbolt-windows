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
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppContext from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import TranslationProvider from "passbolt-styleguide/src/react-extension/components/Common/Internationalisation/TranslationProvider";
import Footer from "passbolt-styleguide/src/react-extension/components/Common/Footer/Footer";
import OrchestrateAccountKitImportation from "passbolt-styleguide/src/react-extension/components/Desktop/OrchestrateAccountKitImportation/OrchestrateAccountKitImportation";
import ImportAccountKitContextProvider from "passbolt-styleguide/src/react-extension/contexts/Desktop/ImportAccountKitContext";
import LogoSVG from "passbolt-styleguide/src/img/svg/logo.svg";
import RenderedWebview from "./components/RenderedWebview";
import {version} from '../package.json';

/**
 * The import application
 */
class AppImport extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState(props);
  }

  async componentDidMount() {
    await localStorage.clear();
  }

  /**
   * Returns the component default state
   */
  defaultState(props) {
    return {
      port: props.port, // The background page communication port
      storage: props.storage, // The storage
      extensionVersion: version,
      siteSettings: {
        url: ""
      },
    };
  }


  /**
   * Renders the component
   */
  render() {
    return (
      <RenderedWebview port={this.props.port}>
        <AppContext.Provider value={this.state}>
          <TranslationProvider loadingPath="https://rendered.dist/Rendered/dist/locales/{{lng}}/{{ns}}.json">
            <Router>
              <div id="container" className="container page login">
                <div className="content">
                  <div className="header">
                    <div className="logo-svg">
                      <LogoSVG role="img" width="20rem" height="3.5rem"/>
                    </div>
                  </div>
                  <div className="login-form">
                    <Switch>
                      <Route path={[
                        "/",
                      ]}>
                        <ImportAccountKitContextProvider>
                          <OrchestrateAccountKitImportation />
                        </ImportAccountKitContextProvider>
                      </Route>
                    </Switch>
                  </div>
                </div>
                <Footer />
              </div>
            </Router>
          </TranslationProvider>
        </AppContext.Provider>
      </RenderedWebview>
    );
  }
}

AppImport.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default AppImport;
