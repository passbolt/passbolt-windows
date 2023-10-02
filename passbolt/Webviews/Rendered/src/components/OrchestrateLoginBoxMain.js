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
 * @since         0.3.0
 */

import PropTypes from "prop-types";
import DisplayUnexpectedError from "passbolt-styleguide/src/react-extension/components/Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import AcceptLoginServerKeyChange from "passbolt-styleguide/src/react-extension/components/AuthenticationLogin/AcceptLoginServerKeyChange/AcceptLoginServerKeyChange";
import LoadingSpinner from "passbolt-styleguide/src/react-extension/components/Common/Loading/LoadingSpinner/LoadingSpinner";
import {AuthenticationLoginWorkflowStates, withAuthenticationLoginContext} from "passbolt-styleguide/src/react-extension/contexts/Authentication/AuthenticationLoginContext";
import {withAppContext} from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import React, {Component} from "react";
import Login from "passbolt-styleguide/src/react-extension/components/AuthenticationLogin/Login/Login";
import {Trans, withTranslation} from "react-i18next";

/**
 * The component orchestrates the login authentication box main content.
 */
class OrchestrateLoginBoxMain extends Component {
  /**
   * Render the component
   */
  render() {
    switch (this.props.authenticationLoginContext.state) {
      case AuthenticationLoginWorkflowStates.SIGN_IN:
        return <Login
          canRememberMe={false}
          isSsoAvailable={false}
          isDesktop={true}
          userSettings={this.props.context.userSettings}
          onSignIn={this.props.authenticationLoginContext.signIn}
          onCheckPassphrase={this.props.authenticationLoginContext.checkPassphrase}
        />;
      case AuthenticationLoginWorkflowStates.ACCEPT_NEW_SERVER_KEY:
        return <AcceptLoginServerKeyChange
          serverKey={this.props.authenticationLoginContext.serverKey}
          onAccept={this.props.authenticationLoginContext.acceptNewServerKey}
        />;
      case AuthenticationLoginWorkflowStates.SIGNING_IN:
        return <LoadingSpinner
          title={<Trans>Signing in, please wait...</Trans>}
        />;
      case AuthenticationLoginWorkflowStates.SIGN_IN_ERROR:
        return <DisplayUnexpectedError
          title={<Trans>Sorry, you have not been signed in.</Trans>}
          message={<Trans>Something went wrong, the sign in failed with the following error:</Trans>}
          error={this.props.authenticationLoginContext.error}
        />;
      case AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR:
        return <DisplayUnexpectedError
          error={this.props.authenticationLoginContext.error}
        />;
      case AuthenticationLoginWorkflowStates.LOADING:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateLoginBoxMain.propTypes = {
  context: PropTypes.any.isRequired, // The application context
  authenticationLoginContext: PropTypes.any.isRequired, // The authentication login context
};
export default withAppContext(withAuthenticationLoginContext(withTranslation("common")(OrchestrateLoginBoxMain)));
