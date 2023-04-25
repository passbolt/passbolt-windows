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
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import HandleExtAppBootstrapRouteChangeRequested from "passbolt-styleguide/src/react-extension/components/Common/Route/HandleExtAppBootstrapRouteChangeRequested"

/**
 * The bootstrap of the passbolt application served by the desktop application (will be removed).
 * This application is inserted in the page served by the API and inject the iframe that will contain the passbolt application.
 */
class ExtBootstrapApp extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
  }

  /**
   * Component default state
   * @param props
   * @returns {object}
   */
  getDefaultState(props) {
    return {
      port: props.port,
      storage: props.storage,
      userSettings: null
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
  }


  render() {
    if (!this.isPassboltApp()) {
      return null;
    }

    return (
      <>
        {this.isReady &&
        <Router basename={this.basename}>
          <HandleExtAppBootstrapRouteChangeRequested port={this.props.port}/>
          <Switch>
            <Route path={[
              "/",
            ]}>
              <>
                <h2>Connected</h2>
              </>
            </Route>
          </Switch>
        </Router>
        }
      </>
    );
  }
}

ExtBootstrapApp.propTypes = {
  port: PropTypes.object, // The browser extension communication port
  storage: PropTypes.object, // The extension local storage
};

export default ExtBootstrapApp;
