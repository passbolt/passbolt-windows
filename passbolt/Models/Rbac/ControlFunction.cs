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

using Newtonsoft.Json;
using System;

namespace passbolt.Models.Rbac
{
    public class ControlFunction
    {
        [JsonProperty("control_function")]
        public string Control { get; set; }
        [JsonProperty("foreign_id")]
        public Guid ForeignId { get; set; }
        [JsonProperty("foreign_model")]
        public string ForeignModel { get; set; }
        [JsonProperty("id")]
        public Guid Id { get; set; }
        [JsonProperty("role_id")]
        public Guid RoleId { get; set; }
        [JsonProperty("ui_action")]
        public UiAction UiAction { get; set; }

    }
}
