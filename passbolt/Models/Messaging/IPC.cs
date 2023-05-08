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

using System.ComponentModel.DataAnnotations;
using passbolt.Models.Messaging;

namespace passbolt.Models
{
    public class IPC
    {
        public IPC() { }

        public IPC(string topic)
        {
            this.topic = topic;
            this.message = null;
            this.requestId = null;
            this.status = null;
        }
        public IPC(string topic, string message)
        {
            this.topic = topic;
            this.message = message;
            this.requestId = null;
            this.status = null;
        }

        [Required]
        [AllowedTopic(ErrorMessage = "Invalid topic")]
        public string topic { get; set; }

        public string status { get; set; }

        public object message { get; set; }
        public string requestId { get; set; }


        /// <summary>
        /// Validation attribut for topic
        /// </summary>
        public class AllowedTopicAttribute : ValidationAttribute
        {
            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                if (AllowedTopics.IsTopicNameAllowed((string)value))
                {
                    return ValidationResult.Success;
                }
                else
                {
                    return new ValidationResult(ErrorMessage);
                }
            }
        }
    }
}
