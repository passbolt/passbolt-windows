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

import {withRouter} from "react-router-dom";
import {withAppContext} from "passbolt-styleguide/src/shared/context/AppContext/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "passbolt-styleguide/src/react-extension/contexts/ResourceWorkspaceContext";
import React from "react";
import PropTypes from "prop-types";

class ResourcesWebviewContext extends React.Component {

  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // Add event listener to watch for changes in the localStorage
    window.addEventListener('storage', this.handleLocalStorageChange);
  }
    
  componentWillUnmount() {
    // Remove event listener when component is unmounted
    window.removeEventListener('storage', this.handleLocalStorageChange);
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

ResourcesWebviewContext.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any,
  history: PropTypes.object,
};

export default withAppContext(withResourceWorkspace(withRouter(ResourcesWebviewContext)));
