
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.4.0
 */

import React from 'react';
import {Route, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "passbolt-styleguide/src/react-extension/components/Common/Navigation/Header/Logo";
import DisplayUserBadgeMenu from "passbolt-styleguide/src/react-extension/components/User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import {withAppContext} from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import NavigateIntoUserSettingsWorkspace from "passbolt-styleguide/src/react-extension/components/UserSetting/NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace";
import DisplayUserProfile from "passbolt-styleguide/src/react-extension/components/UserSetting/DisplayUserProfile/DisplayUserProfile";
import DisplayUserTheme from "passbolt-styleguide/src/react-extension/components/UserSetting/DisplayUserTheme/DisplayUserTheme";
import DisplayUserSettingsWorkspaceBreadcrumb
  from "passbolt-styleguide/src/react-extension/components/UserSetting/DisplayUserSettingsWorkspaceBreadcrumb/DisplayUserSettingsWorkspaceBreadcrumb";
import DisplayUserGpgInformation from "passbolt-styleguide/src/react-extension/components/UserSetting/DisplayUserGpgInformation/DisplayUserGpgInformation";
import SearchBar from "passbolt-styleguide/src/react-extension/components/Common/Navigation/Search/SearchBar";
import DisplayUserPassphrase from "passbolt-styleguide/src/react-extension/components/UserSetting/ChangeUserPassphrase/ChangeUserPassphrase";
import DisplayUserChooseSecurityToken from "passbolt-styleguide/src/react-extension/components/UserSetting/ChangeUserSecurityToken/ChangeUserSecurityToken";
import TransferToMobile from "passbolt-styleguide/src/react-extension/components/UserSetting/TransferToMobile/TransferToMobile";
import DisplayAccountRecoveryUserSettings from 'passbolt-styleguide/src/react-extension/components/UserSetting/DisplayUserAccountRecovery/DisplayAccountRecoveryUserSettings';
import {withAccountRecovery} from "passbolt-styleguide/src/react-extension/contexts/AccountRecoveryUserContext";
import {withMfa} from 'passbolt-styleguide/src/react-extension/contexts/MFAContext';
import ExportAccountToDesktop from 'passbolt-styleguide/src/react-extension/components/UserSetting/ExportAccountToDesktop/ExportAccountToDesktop';
import OrchestrateMfaSettings from 'passbolt-styleguide/src/react-extension/components/MFA/OrchestrateMfaSettings/OrchestrateMfaSettings';

/**
 * This component is a container for all the user settings workspace features
 * @important This is a temporary to avoid breaking the web version  and allow Desktop to manage MFA
 */
class DisplayUserSettingsWorkspace extends React.Component {
  /**
   * Can the user access the theme capability.
   * @returns {bool}
   */
  get canIUseThemeCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountSettings');
  }

  /**
   * Can the user access the mobile transfer capability.
   * @returns {bool}
   */
  get canIUseMobileTransferCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('mobile');
  }

  /**
   * Can the user access the desktop export capability.
   * @returns {bool}
   */
  get canIUseDesktopExportCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('desktop');
  }

  /**
   * Can the user access the account recovery capability.
   * @returns {bool}
   */
  get canIUseAccountRecoveryCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountRecovery');
  }

  /**
   * Return if user has to define mfa.
   * @returns {bool}
   */
  get isMfaChoiceRequired() {
    return this.props.mfaContext.isMfaChoiceRequired();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const {path} = this.props.match;
    return (
      <div>
        <div className="header second">
          <Logo/>
          <SearchBar disabled={true}/>
          <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
        </div>
        <div className="panel main">
          <div className="panel left">
            <NavigateIntoUserSettingsWorkspace
              hasPendingMfaChoice={this.isMfaChoiceRequired}
              hasPendingAccountRecoveryChoice={this.props.accountRecoveryContext.isAccountRecoveryChoiceRequired()}/>
          </div>
          <div className="panel middle">
            <DisplayUserSettingsWorkspaceBreadcrumb/>
            <Route path={`${path}/profile`} component={DisplayUserProfile}/>
            <Route path={`${path}/passphrase`} component={DisplayUserPassphrase}/>
            <Route path={`${path}/security-token`} component={DisplayUserChooseSecurityToken}></Route>
            {this.canIUseThemeCapability &&
            <Route path={`${path}/theme`} component={DisplayUserTheme}/>
            }
            {this.canIUseMobileTransferCapability &&
            <Route path={`${path}/mobile`} component={TransferToMobile}></Route>
            }
            {this.canIUseDesktopExportCapability &&
            <Route path={`${path}/desktop`} component={ExportAccountToDesktop}></Route>
            }
            {this.canIUseAccountRecoveryCapability &&
            <Route path={`${path}/account-recovery`} component={DisplayAccountRecoveryUserSettings}></Route>
            }
            <Route path={`${path}/mfa`} component={OrchestrateMfaSettings}></Route>
            <Route path={`${path}/keys`} component={DisplayUserGpgInformation}></Route>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserSettingsWorkspace.propTypes = {
  context: PropTypes.any, // The application context
  match: PropTypes.any,
  accountRecoveryContext: PropTypes.object, // The account recovery context
  mfaContext: PropTypes.object,
};

export default withAppContext(withAccountRecovery(withMfa(withRouter(DisplayUserSettingsWorkspace))));
