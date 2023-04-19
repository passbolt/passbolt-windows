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
 * @since         0.0.1
 */

using System;
using System.Reflection;

namespace passbolt_windows_tests.Utils
{
    internal class ReflectionUtil
    {   

        /// <summary>
        /// Get member info from object
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="fieldName"></param>
        /// <returns></returns>
        public static MemberInfo GetFieldInfo(object obj, string fieldName)
        {
            Type type = obj.GetType();
            FieldInfo field =  type.GetField(fieldName, BindingFlags.NonPublic | BindingFlags.Instance);
            if(field != null) { return field; }

            PropertyInfo property = type.GetProperty(fieldName, BindingFlags.NonPublic | BindingFlags.Instance);
            if (property != null) { return property; }

            throw new ArgumentException($"Cannot find field or property with name '{fieldName}'");
        }

        /// <summary>
        /// Retrieve the private field of an object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="fieldName"></param>
        /// <returns></returns>
        public static T GetPrivateField<T>(object obj, string fieldName)
        {
            var field = (FieldInfo)GetFieldInfo(obj, fieldName);
            return (T)field.GetValue(obj);
        }

        /// <summary>
        /// Retrieve the private property of an object
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="fieldName"></param>
        /// <returns></returns>
        public static T GetPrivateProperty<T> (object obj, string fieldName)
        {
            var field = (PropertyInfo) GetFieldInfo(obj, fieldName);
            return (T)field.GetValue(obj);
        }


        /// <summary>
        /// Set the private property of an object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="fieldName"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static T SetPrivateProperty<T>(object obj, string fieldName, T value)
        {
            var field = (PropertyInfo) GetFieldInfo(obj, fieldName);
            field.SetValue(obj, value);
            return (T)field.GetValue(obj);
        }
        
        /// <summary>
        /// Set the private field of an object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="fieldName"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static T SetPrivatefield<T>(object obj, string fieldName, T value)
        {
            var field = (FieldInfo)GetFieldInfo(obj, fieldName);
            field.SetValue(obj, value);
            return (T)field.GetValue(obj);
        }

        /// <summary>
        /// Return the method information
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="methodName"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        private static MethodInfo GetMethodInfo(object obj, string methodName, BindingFlags bindingFlags)
        {
            var type = obj.GetType();
            var method = type.GetMethod(methodName,bindingFlags);
            if (method == null)
            {
                throw new ArgumentException($"Method {methodName} not found on type {type.FullName}");
            }
            return method;
        }

        /// <summary>
        /// Invoke the private method for testing
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="methodName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public static T InvokePrivateMethod<T>(object obj, string methodName, params object[] parameters)
        {
            var method = GetMethodInfo(obj, methodName, BindingFlags.NonPublic | BindingFlags.Instance);
            return (T)method.Invoke(obj, parameters);
        }

        /// <summary>
        /// Invoke the static private method for testing
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="obj"></param>
        /// <param name="methodName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public static T InvokePrivateStaticMethod<T>(object obj, string methodName, params object[] parameters)
        {
            var method = GetMethodInfo(obj, methodName, BindingFlags.NonPublic | BindingFlags.Static);
            return (T)method.Invoke(obj, parameters);
        }
    }
}
