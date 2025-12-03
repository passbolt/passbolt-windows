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
* @since         0.0.3
*/

using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.Storage;

namespace passbolt.Services.LocalFolder
{
    public class LocalFolderService
    {
        private StorageFolder localFolder;
        private StorageFolder webviewsFolder;
        private StorageFolder webviewsFolderInstallation;
        private string webviewsFolderName = "Webviews";
        private string commonCSP = "default-src 'none'; form-action 'none';";

        private LocalFolderService() { }

        private static readonly LocalFolderService instance = new LocalFolderService();
        public static LocalFolderService Instance { get => instance; }


        /// <summary>
        /// Initiate the localfolder with the InstalledLocation folder
        /// </summary>
        /// <returns></returns>
        public async Task InitiateLocalFolder()
        {
            StorageFolder installationFolder = Package.Current.InstalledLocation;
            localFolder = ApplicationData.Current.LocalFolder;
            webviewsFolderInstallation = await installationFolder.GetFolderAsync(webviewsFolderName);
            webviewsFolder = await localFolder.CreateFolderAsync(webviewsFolderName, CreationCollisionOption.ReplaceExisting);
            await  webviewsFolder.CreateFolderAsync("Rendered", CreationCollisionOption.ReplaceExisting);
            await webviewsFolder.CreateFolderAsync("Background", CreationCollisionOption.ReplaceExisting);
        }


        /// <summary>
        /// Getter for the webviews folder
        /// </summary>
        /// <returns></returns>
        public StorageFolder GetWebviewsFolder()
        {
            return webviewsFolder;
        }

        /// <summary>
        /// Getter for the webviews installation folder
        /// </summary>
        /// <returns></returns>
        public StorageFolder GetWebviewsFolderInstallation()
        {
            return webviewsFolderInstallation;
        }

        /// <summary>
        /// Get index file into folder
        /// </summary>
        /// <param name="Webview"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        async Task<StorageFile> GetIndexFile(String Webview, String name)
        {
            StorageFolder webviewFolder = await webviewsFolder.GetFolderAsync(Webview);
            return await webviewFolder.GetFileAsync(name);
        }

        /// <summary>
        /// Remove file from local folder
        /// </summary>
        /// <param name="Webview"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public async Task RemoveFile(String Webview, String name)
        {
            StorageFile file = await this.GetIndexFile(Webview, name);
            await file.DeleteAsync();
        }

        /// <summary>
        /// Create a file into the application
        /// </summary>
        /// <param name="Webview"></param>
        /// <returns></returns>
        async Task<StorageFile> CreateFile(String Webview, String name)
        {
            StorageFolder webviewFolder= await webviewsFolder.GetFolderAsync(Webview);
            return await webviewFolder.CreateFileAsync(name, CreationCollisionOption.ReplaceExisting);
        }

        /// <summary>
        /// Get the rendered csp content
        /// </summary>
        /// <param name="trustedDomain"></param>
        /// <param name="script"></param>
        private string GetRenderedCSP(string script, string trustedDomain)
        {
            string cspAllowedUrlOnTrustedDomain = this.getCspAllowedUrlOnTrustedDomain(trustedDomain);

            var imgSrc = "img-src https://rendered.dist/Rendered/img/";
            string csp;
            if (script == "rendered-auth")
            {
                csp = $"{imgSrc} {cspAllowedUrlOnTrustedDomain}; connect-src https://rendered.dist/Rendered/dist/locales/;";
            }
            else if (script == "rendered-workspace")
            {
                //Data: used for the totp scan image
                //Blob: used for the import OTP image (resources) 
                csp = $"{imgSrc} {cspAllowedUrlOnTrustedDomain} data: blob: ; connect-src https://rendered.dist/Rendered/dist/locales/;";
            }
            else
            {
                //locales are missing during the import process
                csp = $"{imgSrc}; ";
            }

            // return the common csp with specific by apps
            return $@"<meta http-equiv=""Content-Security-Policy"" content=""{this.commonCSP} script-src https://rendered.dist/Rendered/; style-src 'self' https://rendered.dist/Rendered/dist/themes/; font-src https://rendered.dist/Rendered/fonts/; {csp}"" />";
        }
         

        /// <summary>
        /// Get the background csp content
        /// </summary>
        /// <param name="trustedDomain"></param>
        /// <param name="script"></param>
        private string GetBackgroundCSP(string script, string trustedDomain)
        {
            string cspAllowedUrlOnTrustedDomain = this.getCspAllowedUrlOnTrustedDomain(trustedDomain);

            var csp = "";
            //We allow for all apps to retrieve the locales by the fetch instance
            var connectSrc = $"connect-src https://background.dist/Background/dist/locales/";

            if (script == "background-auth")
            {
                //We does not need the pwned password for the authentication process
                csp = $"{connectSrc} {cspAllowedUrlOnTrustedDomain};";
            }
            else if (script == "background-workspace")
            {
                csp = $"{connectSrc} {cspAllowedUrlOnTrustedDomain}  https://api.pwnedpasswords.com;";
            }
            else if (script == "background-import")
            {
                //We does not know the trusted domain during importation
                csp = $"{connectSrc};";
            }

            // return the common csp with specific by apps
            return $@"<meta http-equiv=""Content-Security-Policy"" content=""{this.commonCSP} script-src https://background.dist/Background/; {csp}"" />";
        }

        /// <summary>
        /// Create index file for rendered
        /// </summary>
        /// <param name="name"></param>
        /// <param name="script"></param>
        /// <returns></returns>
        public async Task CreateRenderedIndex(string name, string script, string stylesheet, string trustedDomain = null)
        {
            var csp = this.GetRenderedCSP(script, trustedDomain);
            StorageFile indexFile = await this.CreateFile("Rendered", name);
            var content = "<!DOCTYPE html> <html> <head>  <meta charset=\"UTF-8\"> " +
             csp +
              $@"<script id=""stylesheet-manager"" data-file={stylesheet} src=""https://rendered.dist/Rendered/src/js/stylesheet.js""></script></head>" +
              $@"<body> <script src=""https://rendered.dist/Rendered/dist/{script}.js""></script> </body></html>";
            await FileIO.WriteTextAsync(indexFile, content);
        }

        /// <summary>
        /// Create index file for background
        /// </summary>
        /// <param name="name"></param>
        /// <param name="script"></param>
        /// <returns></returns>
        public async Task CreateBackgroundIndex(string name, string script, string trustedDomain = null)
        {
            var csp = this.GetBackgroundCSP(script, trustedDomain);
            StorageFile indexFile = await this.CreateFile("Background", name);
            var content = "<!DOCTYPE html> <html> <head>  <meta charset=\"UTF-8\"> " +
              csp +
              $@"<body> <script src=""https://background.dist/Background/dist/{script}.js""></script> </body></html>";

            await FileIO.WriteTextAsync(indexFile, content);
        }

        /// <summary>
        /// Add a slash in case the trusted domain does not contain it for CSP
        /// </summary>
        /// <param name="trustedDomain"></param>
        /// <returns></returns>
        public string getCspAllowedUrlOnTrustedDomain(string trustedDomain)
        {
            string cspAllowedUrlOnTrustedDomain = null;
            if (trustedDomain != null)
            {
                cspAllowedUrlOnTrustedDomain = Regex.Replace(trustedDomain, @"([^\/]{1})$", "$1/");
            }

            return cspAllowedUrlOnTrustedDomain;
        }
    }
}
