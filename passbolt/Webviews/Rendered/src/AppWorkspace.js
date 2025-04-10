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

import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import AppContext from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import DisplayMainMenu from "passbolt-styleguide/src/react-extension/components/Common/Menu/DisplayMainMenu";
import ManageDialogs from "passbolt-styleguide/src/react-extension/components/Common/Dialog/ManageDialogs/ManageDialogs";
import ResourceWorkspaceContextProvider from "passbolt-styleguide/src/react-extension/contexts/ResourceWorkspaceContext";
import ResourcePasswordGeneratorContextProvider from "passbolt-styleguide/src/react-extension/contexts/ResourcePasswordGeneratorContext";
import ManageContextualMenu from "passbolt-styleguide/src/react-extension/components/Common/ContextualMenu/ManageContextualMenu";
import ManageAnnouncements from "passbolt-styleguide/src/react-extension/components/Announcement/ManageAnnouncements/ManageAnnouncements";
import DisplayResourcesWorkspace from "passbolt-styleguide/src/react-extension/components/Resource/DisplayResourcesWorkspace/DisplayResourcesWorkspace";
import DragContextProvider from "passbolt-styleguide/src/react-extension/contexts/DragContext";
import NavigationContextProvider from "passbolt-styleguide/src/react-extension/contexts/NavigationContext";
import ExtAppContextProvider from "passbolt-styleguide/src/react-extension/contexts/ExtAppContext";
import TranslationProvider from "passbolt-styleguide/src/react-extension/components/Common/Internationalisation/TranslationProvider";
import ActionFeedbackContextProvider from "passbolt-styleguide/src/react-extension/contexts/ActionFeedbackContext";
import DialogContextProvider from "passbolt-styleguide/src/react-extension/contexts/DialogContext";
import AnnouncementContextProvider from "passbolt-styleguide/src/react-extension/contexts/AnnouncementContext";
import ContextualMenuContextProvider from "passbolt-styleguide/src/react-extension/contexts/ContextualMenuContext";
import LoadingContextProvider from "passbolt-styleguide/src/react-extension/contexts/LoadingContext";
import UserWorkspaceContextProvider from "passbolt-styleguide/src/react-extension/contexts/UserWorkspaceContext";
import DisplayUserWorkspace from "passbolt-styleguide/src/react-extension/components/User/DisplayUserWorkspace/DisplayUserWorkspace";
import UserSettingsContextProvider from "passbolt-styleguide/src/react-extension/contexts/UserSettingsContext";
import DisplayUserSettingsWorkspace from "./components/DisplayUserSettingsWorkspace";
import DisplayActionFeedbacks from "passbolt-styleguide/src/react-extension/components/Common/ActionFeedback/DisplayActionFeedbacks";
import HandleFolderMoveStrategyEvents from "passbolt-styleguide/src/react-extension/components/ResourceFolder/HandleFolderMoveStrategyEvents/HandleFolderMoveStrategyEvents";
import HandleProgressEvents from "passbolt-styleguide/src/react-extension/components/Common/Progress/HandleProgressEvents/HandleProgressEvents";
import HandleSessionExpired from "passbolt-styleguide/src/react-extension/components/Authentication/HandleSessionExpired/HandleSessionExpired";
import HandleRouteFallback from "passbolt-styleguide/src/react-extension/components/Common/Route/HandleRouteFallback";
import AccountRecoveryUserContextProvider from "passbolt-styleguide/src/react-extension/contexts/AccountRecoveryUserContext";
import ExtAppAccountRecoveryUserService from "passbolt-styleguide/src/shared/services/api/accountRecovery/ExtAppAccountRecoveryUserService";
import WorkflowContextProvider from "passbolt-styleguide/src/react-extension/contexts/WorkflowContext";
import ManageWorkflows from "passbolt-styleguide/src/react-extension/components/Common/Workflow/ManageWorkflows/ManageWorkflows";
import RbacContextProvider from "passbolt-styleguide/src/shared/context/Rbac/RbacContext";
import RenderedWebview from "./components/RenderedWebview";
import ResourcesWebviewContext from "./contexts/ResourcesWebviewContext";
import PasswordPoliciesContext from "passbolt-styleguide/src/shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import MfaContextProvider from "passbolt-styleguide/src/react-extension/contexts/MFAContext";
import UserPassphrasePoliciesContextProvider from "passbolt-styleguide/src/react-extension/contexts/UserPassphrasePoliciesContext";
import HandlePassphraseEntryEvents
  from "passbolt-styleguide/src/react-extension/components/AuthenticationPassphrase/HandlePassphraseEntryEvents/HandlePassphraseEntryEvents";
import PasswordExpirySettingsContextProvider from "passbolt-styleguide/src/react-extension/contexts/PasswordExpirySettingsContext";
import ProgressContextProvider from "passbolt-styleguide/src/react-extension/contexts/ProgressContext";
import MetadataTypesSettingsLocalStorageContextProvider from "passbolt-styleguide/src/shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import ResourceTypesLocalStorageContextProvider from "passbolt-styleguide/src/shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";

/**
 * The passbolt application served by the desktop.
 */
class AppWorkspace extends Component {
  /**
   * Wait passbolt data to be send to rendered webview
   */
  async isReady() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    return storageData?._passbolt_data;
  }

  /*
   * =============================================================
   *  View
   * =============================================================
   */
  render() {
    const accountRecoveryUserService = new ExtAppAccountRecoveryUserService(this.props.port);
    return (
      <RenderedWebview port={this.props.port}>
        {this.isReady() && <ExtAppContextProvider port={this.props.port} storage={this.props.storage}>
          <AppContext.Consumer>
            {() =>
              <TranslationProvider loadingPath="https://rendered.dist/Rendered/dist/locales/{{lng}}/{{ns}}.json">
                <RbacContextProvider>
                  <AccountRecoveryUserContextProvider accountRecoveryUserService={accountRecoveryUserService}>
                    <PasswordPoliciesContext>
                      <WorkflowContextProvider>
                        <MfaContextProvider>
                          <ActionFeedbackContextProvider>
                            <DialogContextProvider>
                              <AnnouncementContextProvider>
                                <ContextualMenuContextProvider>
                                  <LoadingContextProvider>
                                    <ProgressContextProvider>
                                      { /* Action Feedback Management */}
                                      <DisplayActionFeedbacks />

                                      { /* Dialogs Management */}
                                      <HandleFolderMoveStrategyEvents />
                                      <HandleProgressEvents />
                                      <HandleSessionExpired />
                                      <HandlePassphraseEntryEvents/>

                                      <Router>
                                        <NavigationContextProvider>
                                          <Switch>
                                            {/* Passwords workspace */}
                                            <Route path={[
                                              "/app/folders/view/:filterByFolderId",
                                              "/app/passwords/view/:selectedResourceId",
                                              "/app/passwords",
                                            ]}>
                                              <PasswordExpirySettingsContextProvider>
                                                <ResourceWorkspaceContextProvider>
                                                  <MetadataTypesSettingsLocalStorageContextProvider>
                                                    <ResourceTypesLocalStorageContextProvider>
                                                      <ResourcePasswordGeneratorContextProvider>
                                                        <ManageDialogs />
                                                        <ManageWorkflows />
                                                        <ManageContextualMenu />
                                                        <ManageAnnouncements />
                                                        <DragContextProvider>
                                                          <div id="container" className="page password">
                                                            <div id="app" className="app ready" tabIndex="1000">
                                                              <div className="header first">
                                                                <DisplayMainMenu />
                                                              </div>
                                                              <ResourcesWebviewContext />
                                                              <DisplayResourcesWorkspace onMenuItemClick={this.handleWorkspaceSelect} />
                                                            </div>
                                                          </div>
                                                        </DragContextProvider>
                                                      </ResourcePasswordGeneratorContextProvider>
                                                    </ResourceTypesLocalStorageContextProvider>
                                                  </MetadataTypesSettingsLocalStorageContextProvider>
                                                </ResourceWorkspaceContextProvider>
                                              </PasswordExpirySettingsContextProvider>
                                            </Route>
                                            {/* Users workspace */}
                                            <Route path={[
                                              "/app/groups/view/:selectedGroupId",
                                              "/app/groups/edit/:selectedGroupId",
                                              "/app/users/view/:selectedUserId",
                                              "/app/users"
                                            ]}>
                                              <UserWorkspaceContextProvider>
                                                <ManageDialogs />
                                                <ManageWorkflows />
                                                <ManageContextualMenu />
                                                <ManageAnnouncements />
                                                <div id="container" className="page user">
                                                  <div id="app" className="app ready" tabIndex="1000">
                                                    <div className="header first">
                                                      <DisplayMainMenu />
                                                    </div>
                                                    <DisplayUserWorkspace />
                                                  </div>
                                                </div>
                                              </UserWorkspaceContextProvider>
                                            </Route>
                                            {/* User settings workspace */}
                                            <Route path={"/app/settings"}>
                                              <UserSettingsContextProvider>
                                                <UserPassphrasePoliciesContextProvider>
                                                  <ManageDialogs />
                                                  <ManageAnnouncements />
                                                  <div id="container" className="page settings">
                                                    <div id="app" className="app ready" tabIndex="1000">
                                                      <div className="header first">
                                                        <DisplayMainMenu />
                                                      </div>
                                                      <DisplayUserSettingsWorkspace />
                                                    </div>
                                                  </div>
                                                </UserPassphrasePoliciesContextProvider>
                                              </UserSettingsContextProvider>
                                            </Route>
                                            {/* Fallback */}
                                            <Route path="/">
                                              <HandleRouteFallback />
                                            </Route>
                                          </Switch>
                                        </NavigationContextProvider>
                                      </Router>
                                    </ProgressContextProvider>
                                  </LoadingContextProvider>
                                </ContextualMenuContextProvider>
                              </AnnouncementContextProvider>
                            </DialogContextProvider>
                          </ActionFeedbackContextProvider>
                        </MfaContextProvider>
                      </WorkflowContextProvider>
                    </PasswordPoliciesContext>
                  </AccountRecoveryUserContextProvider>
                </RbacContextProvider>
              </TranslationProvider>
            }
          </AppContext.Consumer>
        </ExtAppContextProvider>
        }
      </RenderedWebview>
    );
  }
}

AppWorkspace.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default AppWorkspace;
