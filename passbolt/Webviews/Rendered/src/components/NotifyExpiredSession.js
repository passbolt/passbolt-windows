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
 * @since         2.12.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import DialogWrapper from "passbolt-styleguide/src/react-extension/components/Common/Dialog/DialogWrapper/DialogWrapper";

/**
 * This component informs the user its session is expired and takes it back to the authentication application.
 *
 * Desktop-specific implementation of the styleguide `NotifyExpiredSession`. The styleguide sign-in
 * button requests `passbolt.tab.reload`, which the Windows application answers by reloading both
 * webviews: the workspace is loaded again with an expired session instead of the login screen. The
 * desktop requests a logout instead, the main process then swaps the webviews to the authentication
 * application, as it does for a user requested logout.
 */
class NotifyExpiredSession extends Component {
  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  /**
   * Init the component event handlers.
   */
  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.goToLogin();
  }

  /**
   * Handle sign-in button click.
   */
  handleSignInClick() {
    this.goToLogin();
  }

  /**
   * Go to the authentication application.
   */
  goToLogin() {
    this.props.context.port.request("passbolt.auth.logout");
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <DialogWrapper
        title={this.props.t("Session Expired")}
        onClose={this.handleCloseClick}
        className="session-expired-dialog">
        <div className="form-content">
          <p><Trans>Your session has expired, you need to sign in.</Trans></p>
        </div>
        <div className="submit-wrapper clearfix">
          <a
            onClick={this.handleSignInClick}
            className="primary button form"
            role="button">
            <Trans>Sign in</Trans>
          </a>
        </div>
      </DialogWrapper>
    );
  }
}

NotifyExpiredSession.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(NotifyExpiredSession));
