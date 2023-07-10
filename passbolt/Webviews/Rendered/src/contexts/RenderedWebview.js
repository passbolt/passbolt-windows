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
 * @since         0.0.2
 */

import {withRouter} from "react-router-dom";
import {withAppContext} from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "passbolt-styleguide/src/react-extension/contexts/ResourceWorkspaceContext";
import React from "react";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next";

class RenderedWebview extends React.Component {

  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }
  
  componentDidMount() {
    // Add event listener to watch for changes in the localStorage
    window.addEventListener('storage', this.handleLocalStorageChange);
    this.listen();
  }
    
  componentWillUnmount() {
    // Remove event listener when component is unmounted
    window.removeEventListener('storage', this.handleLocalStorageChange);
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleLocalStorageUpdate = this.handleLocalStorageUpdate.bind(this);
    this.handleLocalStorageClear = this.handleLocalStorageClear.bind(this);
    this.v = this.handleLocalStorageDelete.bind(this);
  }
    
  /**
   * Listen the progress dialog event from the context and acts accordingly
   */
  listen() {
      this.props.context.port.on('passbolt.rendered.localstorage-update', this.handleLocalStorageUpdate);
      this.props.context.port.on("passbolt.rendered.localstorage-clear", this.handleLocalStorageClear);
      this.props.context.port.on("passbolt.rendered.localstorage-delete", this.handleLocalStorageDelete);
  }

  /**
   * handle the localstorage updates
   * @param {object} data 
   */
  handleLocalStorageUpdate(data) {
    const {key, value} = JSON.parse(data)
    localStorage.setItem(key, value);
    window.dispatchEvent(new StorageEvent('storage', {key, newValue: value}));
  }


  /**
   * handle the localstorage clear
   */
  handleLocalStorageClear() {
    localStorage.clear(key, value)
  }


  /**
   * handle the localstorage deletion
   * @param {object} data 
   */
  handleLocalStorageDelete(data) {
    const {key} = JSON.parse(data)
    localStorage.removeItem(key)
  }

  /**
   * handle localeStorage changes
   * @param {*} event 
   */
  handleLocalStorageChange = async (event) => {
    // Handle the localStorage change here
    // You can access the changed data through event.newValue and event.key
    if(event.key === "resources" && this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.NONE) {
      this.props.history.push({pathname: '/app/passwords', state: {filter: {type: ResourceWorkspaceFilterTypes.ALL}}});
    }
  }

  /**
  * Render the component
  * @return {JSX}
  */
  render() {
    return null;
  }
}

RenderedWebview.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any,
  t: PropTypes.func, // The translation function
  history: PropTypes.object,
};

export default withAppContext(withResourceWorkspace(withRouter(withTranslation('common')(RenderedWebview))));
