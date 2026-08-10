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

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import {withDialog} from "passbolt-styleguide/src/react-extension/contexts/DialogContext";
import NotifyExpiredSession from "./NotifyExpiredSession";

/**
 * This component takes care of checking when the user session is expired.
 * Desktop-specific implementation, it displays the desktop {@link NotifyExpiredSession} dialog.
 */
class HandleSessionExpired extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSessionExpiredEvent = this.handleSessionExpiredEvent.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.props.context.onExpiredSession(this.handleSessionExpiredEvent);
  }

  /**
   * Handle the session expired event
   */
  handleSessionExpiredEvent() {
    // Close all dialogs before to open the session expired dialog
    this.props.dialogContext.closeAll();
    this.props.dialogContext.open(NotifyExpiredSession);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleSessionExpired.propTypes = {
  context: PropTypes.any, // The application context
  dialogContext: PropTypes.any, // The dialog context
};

export default withAppContext(withDialog(HandleSessionExpired));
