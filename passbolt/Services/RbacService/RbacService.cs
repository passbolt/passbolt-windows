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
 * @since         0.5.0
 */

using passbolt.Models.Rbac;
using System.Collections.Generic;

namespace passbolt.Services.RbacService
{
    public class RbacService
    {

        /// <summary>
        /// Add Default uiAction for desktop app
        /// </summary>
        /// <param name="controls"></param>
        /// <returns></returns>
        public void AddDesktopRbac(List<ControlFunction> controls)
        {
            controls.Add(new ControlFunction
            {
                Control = "Deny",
                ForeignModel = "UiAction",
                UiAction = new UiAction { Name = "Administration.viewWorkspace" }
            });
            controls.Add(new ControlFunction
            {
                Control = "Deny",
                ForeignModel = "UiAction",
                UiAction = new UiAction { Name = "Duo.configuration" }
            });
            controls.Add(new ControlFunction
            {
                Control = "Deny",
                ForeignModel = "UiAction",
                UiAction = new UiAction { Name = "Avatar.upload" }
            });
        }
    }
}