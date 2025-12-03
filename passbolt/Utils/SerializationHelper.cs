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

using System;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace passbolt.Utils
{
    public static class SerializationHelper
    {
        private static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            TypeNameHandling = TypeNameHandling.None,
        };


        public static string SerializeToJson<T>(T obj)
        {
            return JsonConvert.SerializeObject(obj, Settings);
        }

        public static T DeserializeFromJson<T>(string data)
        {
            if (string.IsNullOrEmpty(data))
                throw new ArgumentNullException(nameof(data));

            JsonSerializerSettings settings = new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.None,
                StringEscapeHandling = StringEscapeHandling.EscapeHtml
            };

            try
            {
                T obj = JsonConvert.DeserializeObject<T>(SanitizeData(data), settings);

                if (obj == null)
                    throw new InvalidOperationException("Deserialized object is null.");

                return obj;
            }
            catch (JsonSerializationException ex)
            {
                throw new InvalidOperationException(ex.InnerException?.Message ?? ex.Message);
            }
        }

        private static string SanitizeData(string data)
        {
            string sanitizeData = Regex.Replace(data, @"<script.*?</script>", "", RegexOptions.IgnoreCase);
            sanitizeData = Regex.Replace(sanitizeData, @"\brequire\b(?!d)", "", RegexOptions.IgnoreCase);

            return sanitizeData;
        }
    }

    public class SingleTypeBinder : SerializationBinder
    {
        private readonly Type _type;

        public SingleTypeBinder(Type type)
        {
            _type = type;
        }

        public override Type BindToType(string assemblyName, string typeName)
        {
            if (typeName != _type.FullName)
                throw new JsonSerializationException($"Deserialization of type {typeName} is not allowed.");

            return _type;
        }
    }

}

