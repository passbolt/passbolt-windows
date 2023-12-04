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

import React from "react";
import PropTypes from "prop-types";


class RenderedWebview extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.defaultState;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      isReady: false,
    };
  }

  componentDidMount() {
    this.listen();
  }
  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleLocalStorageUpdate = this.handleLocalStorageUpdate.bind(this);
    this.handleLocalStorageClear = this.handleLocalStorageClear.bind(this);
    this.handleLocalStorageDelete = this.handleLocalStorageDelete.bind(this);
  }

  /**
   * Listen the localstorage event from the context and acts accordingly
   */
  listen() {
    this.props.port.on('passbolt.rendered.localstorage-update', this.handleLocalStorageUpdate);
    this.props.port.on("passbolt.rendered.localstorage-clear", this.handleLocalStorageClear);
    this.props.port.on("passbolt.rendered.localstorage-delete", this.handleLocalStorageDelete);
  }

  /**
   * handle the localstorage updates
   * @param {object} data
   */
  handleLocalStorageUpdate(requestId, data) {
    try {
      const {key, value} = JSON.parse(data);
      localStorage.setItem(key, value);

      if (key === "resources" && !this.state.isReady) {
        this.props.port.request("passbolt.rendered.is-ready");
        this.setState({isReady: true});
      }
      window.dispatchEvent(new StorageEvent('storage', {key: key, newValue: value}));
    } catch (ex) {
      console.log(ex);
    }
  }

  /**
   * handle the localstorage clear
   */
  handleLocalStorageClear() {
    localStorage.clear();
  }

  /**
   * handle the localstorage deletion
   * @param {object} data
   */
  handleLocalStorageDelete(data) {
    const {key} = JSON.parse(data);
    localStorage.removeItem(key);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

RenderedWebview.propTypes = {
  port: PropTypes.any, // The application port
  children: PropTypes.any, // The component children
};

export default RenderedWebview;
