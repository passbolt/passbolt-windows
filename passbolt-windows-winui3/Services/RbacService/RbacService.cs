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
* @since         0.5.0
 */

using passbolt_windows_winui3.Models.Rbac;
using System.Collections.Generic;
using System.Linq;

namespace passbolt_windows_winui3.Services.RbacService
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
            this.AddOrUpdateDesktopRbac(controls, "Administration.viewWorkspace", "Deny");
            this.AddOrUpdateDesktopRbac(controls, "Duo.configuration", "Deny");
            this.AddOrUpdateDesktopRbac(controls, "Avatar.upload", "Deny");
            this.AddOrUpdateDesktopRbac(controls, "Mobile.transfer", "Deny");
            this.AddOrUpdateDesktopRbac(controls, "Desktop.transfer", "Deny");
            this.AddOrUpdateDesktopRbac(controls, "Profil.accountRecovery", "Deny");
        }


        /// <summary>
        /// Add or Update entry to desktop configuration
        /// </summary>
        /// <param name="controls"></param>
        /// <param name="uiActionName"></param>
        /// <param name="control"></param>
        public void AddOrUpdateDesktopRbac(List<ControlFunction> controls, string uiActionName, string control)
        {
            // First, try to find an existing ControlFunction with the specified UiAction name.
            var existingControl = controls.FirstOrDefault(cf => cf.UiAction != null && cf.UiAction.Name == uiActionName);

            // If it exists, update the 'Control' property.
            if (existingControl != null)
            {
                existingControl.Control = control;
            }
            else
            {
                // If it does not exist, add a new ControlFunction object to the list.
                controls.Add(new ControlFunction
                {
                    Control = control,
                    ForeignModel = "UiAction",
                    UiAction = new UiAction { Name = uiActionName }
                });
            }
        }
    }
}
