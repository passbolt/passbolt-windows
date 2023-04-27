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
 * @since         0.0.1
 */

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import AppContext from "passbolt-styleguide/src/react-extension/contexts/AppContext";
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
import LocationComponent from "./components/LocationComponent";
import ActionFeedbackContextProvider from "passbolt-styleguide/src/react-extension/contexts/ActionFeedbackContext";
import DialogContextProvider from "passbolt-styleguide/src/react-extension/contexts/DialogContext";
import AnnouncementContextProvider from "passbolt-styleguide/src/react-extension/contexts/AnnouncementContext";
import ContextualMenuContextProvider from "passbolt-styleguide/src/react-extension/contexts/ContextualMenuContext";
import LoadingContextProvider from "passbolt-styleguide/src/react-extension/contexts/LoadingContext";
import UserWorkspaceContextProvider from "passbolt-styleguide/src/react-extension/contexts/UserWorkspaceContext";
import DisplayUserWorkspace from "passbolt-styleguide/src/react-extension/components/User/DisplayUserWorkspace/DisplayUserWorkspace";
import UserSettingsContextProvider from "passbolt-styleguide/src/react-extension/contexts/UserSettingsContext";
import DisplayUserSettingsWorkspace from "passbolt-styleguide/src/react-extension/components/UserSetting/DisplayUserSettingsWorkspace/DisplayUserSettingsWorkspace";
import DisplayActionFeedbacks from "passbolt-styleguide/src/react-extension/components/Common/ActionFeedback/DisplayActionFeedbacks";
import HandleFolderMoveStrategyEvents from "passbolt-styleguide/src/react-extension/components/ResourceFolder/HandleFolderMoveStrategyEvents/HandleFolderMoveStrategyEvents";
import HandleProgressEvents from "passbolt-styleguide/src/react-extension/components/Common/Progress/HandleProgressEvents/HandleProgressEvents";
import HandleErrorEvents from "passbolt-styleguide/src/react-extension/components/Common/Error/HandleErrorEvents/HandleErrorEvents";import Footer from "passbolt-styleguide/src/react-extension/components/Common/Footer/Footer";
import HandleSessionExpired from "passbolt-styleguide/src/react-extension/components/Authentication/HandleSessionExpired/HandleSessionExpired";

/**
 * The passbolt application served by the desktop.
 */
class App extends Component {

  /*
   * =============================================================
   *  View
   * =============================================================
   */
  render() {
    return (
      <ExtAppContextProvider port={this.props.port} storage={this.props.storage}>
        <AppContext.Consumer>
          {appContext =>
            <TranslationProvider loadingPath="dist/locales/{{lng}}/{{ns}}.json">
              <ActionFeedbackContextProvider>
                <DialogContextProvider>
                  <AnnouncementContextProvider>
                    <ContextualMenuContextProvider>
                      <LoadingContextProvider>
                      { /* Action Feedback Management */}
                                <DisplayActionFeedbacks/>

                                { /* Dialogs Management */}
                                <HandleFolderMoveStrategyEvents/>
                                <HandleProgressEvents/>
                                <HandleErrorEvents/>
                                <HandleSessionExpired/>
                        <Router>
                          <LocationComponent></LocationComponent>
                          <NavigationContextProvider>
                            <Switch>
                              {/* Passwords workspace */}
                              <Route path={[
                                "/app/folders/view/:filterByFolderId",
                                "/app/passwords/view/:selectedResourceId",
                                "/app/passwords",
                                "/"
                              ]}>
                                <ResourceWorkspaceContextProvider>
                                  <ResourcePasswordGeneratorContextProvider>
                                    <ManageDialogs />
                                    <ManageContextualMenu />
                                    <ManageAnnouncements />
                                    <DragContextProvider>
                                      <div id="container" className="page password">
                                        <div id="app" className="app ready" tabIndex="1000">
                                          <div className="header first">
                                            <DisplayMainMenu />
                                          </div>
                                          <DisplayResourcesWorkspace onMenuItemClick={this.handleWorkspaceSelect} />
                                        </div>
                                      </div>
                                    </DragContextProvider>
                                  </ResourcePasswordGeneratorContextProvider>
                                </ResourceWorkspaceContextProvider>
                              </Route>
                              {/* Users workspace */}
                              <Route path={[
                                "/app/groups/view/:selectedGroupId",
                                "/app/groups/edit/:selectedGroupId",
                                "/app/users/view/:selectedUserId",
                                "/app/users",
                              ]}>
                                <UserWorkspaceContextProvider>
                                  <ManageDialogs />
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
                                </UserSettingsContextProvider>
                              </Route>
                            </Switch>
                          </NavigationContextProvider>
                        </Router>
                        <Footer/>
                      </LoadingContextProvider>
                    </ContextualMenuContextProvider>
                  </AnnouncementContextProvider>
                </DialogContextProvider>
              </ActionFeedbackContextProvider>
            </TranslationProvider>
          }
        </AppContext.Consumer>
      </ExtAppContextProvider>
    );
  }
}

App.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default App;
