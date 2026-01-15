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
using System;
using System.Collections.Generic;
using System.Linq;

namespace passbolt.Services.RbacService
{
    public class RbacService
    {

        /// <summary>
        /// Add Default uiAction for desktop app
        /// </summary>
        /// <param name="controls"></param>
        /// <returns></returns>
        public void AddDesktopRbac(List<RbacEntity> controls)
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
        public void AddOrUpdateDesktopRbac(List<RbacEntity> rbacs, string uiActionName, string controlFunction)
        {
            // First, try to find an existing Rbac with the specified UiAction name.
            var existingRbac = rbacs.FirstOrDefault(rbac => rbac.UiAction != null && rbac.UiAction.Name == uiActionName);

            // If it exists, update the 'ControlFunction' property.
            if (existingRbac != null)
            {
                existingRbac.ControlFunction = controlFunction;
            }
            else
            {
                rbacs.Add(new RbacEntity
                {
                    Id = Guid.NewGuid(),
                    ForeignId = Guid.NewGuid(),
                    RoleId = Guid.NewGuid(),
                    ControlFunction = controlFunction,
                    ForeignModel = "UiAction",
                    Action = new RbacAction
                    {
                        Id = Guid.NewGuid(),
                        Name = uiActionName
                    },
                    UiAction = new RbacAction
                    {
                        Id = Guid.NewGuid(),
                        Name = uiActionName
                    }
                });
            }
        }
    }
}