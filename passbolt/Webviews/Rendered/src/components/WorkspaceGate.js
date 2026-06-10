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
 * @since         2.10.0
 */

import React from "react";
import PropTypes from "prop-types";
import {ResourceTypesLocalStorageContext}
  from "passbolt-styleguide/src/shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import DisplayResourcesWorkspace
  from "passbolt-styleguide/src/react-extension/components/Resource/DisplayResourcesWorkspace/DisplayResourcesWorkspace";

// Windows-only: remount DisplayResourcesWorkspace once resourceTypes finishes
// loading from the BG localStorage round-trip. Without it, DisplayResourcesList
// builds its defaultColumns at mount with resourceTypes still null, and the
// Pin code column is never appended — toggling its visibility from the columns
// dropdown then has no effect on the grid until the user navigates away/back.
const WorkspaceGate = (props) => (
  <ResourceTypesLocalStorageContext.Consumer>
    {({resourceTypes}) => (
      <DisplayResourcesWorkspace
        key={resourceTypes ? "rt-loaded" : "rt-loading"}
        {...props}
      />
    )}
  </ResourceTypesLocalStorageContext.Consumer>
);

WorkspaceGate.propTypes = {
  onMenuItemClick: PropTypes.func,
};

export default WorkspaceGate;
