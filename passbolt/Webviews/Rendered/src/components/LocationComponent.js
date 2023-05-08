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
 * @since         0.0.1
 */

import React from "react";
import {withRouter} from 'react-router-dom';
import PropTypes from "prop-types";

class LocationComponent extends React.Component {
    /**
      * Whenever the component is mounted
      */
    componentDidMount() {
        this.handleRouteChanged();
    }

    /**
     * Whenever the route changed.
     * Notify the background page to update the browser url.
     */
    handleRouteChanged() {
        this.props.history.listen(location => {
            console.log(location)
        });
    }

    /**
     * Render the component
     * @return {JSX}
     */
    render() {
        return null;
    }
}


LocationComponent.propTypes = {
    history: PropTypes.object,
    children: PropTypes.any
};

export default withRouter(LocationComponent);