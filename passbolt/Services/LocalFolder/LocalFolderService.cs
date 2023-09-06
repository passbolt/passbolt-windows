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
        /// Create index file for rendered
        /// </summary>
        /// <param name="name"></param>
        /// <param name="script"></param>
        /// <returns></returns>
        public async Task CreateRenderedIndex(string name, string script, string stylesheet, string csp = null)
        {
            StorageFile indexFile = await this.CreateFile("Rendered", name);
            var content = "<!DOCTYPE html> <html> <head>  <meta charset=\"UTF-8\"> " +
              $@"<meta http-equiv=""Content-Security-Policy"" default-src 'self'; script-src 'self'; img-src 'self' {csp}; />" +
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
        public async Task CreateBackgroundIndex(string name, string script, string csp = null)
        {
            StorageFile indexFile = await this.CreateFile("Background", name);
            var content = "<!DOCTYPE html><html> <head>  <meta charset=\"UTF-8\"> " +
              (csp != null ? $"<meta http-equiv=\"Content-Security-Policy\" default-src 'self' ${csp} https://api.pwnedpasswords.com; script-src 'self' /></head>" : "") +
              $@"<body><script src=""https://background.dist/Background/dist/{script}.js""></script></body></html>";

            await FileIO.WriteTextAsync(indexFile, content);
        }
    }
}
