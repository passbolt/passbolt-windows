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

using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Navigation;
using passbolt_windows_winui3.Services.LocalFolder;
using System;
using System.Diagnostics;


// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace passbolt_windows_winui3
{
    /// <summary>
    /// Provides application-specific behavior to supplement the default Application class.
    /// </summary>
    sealed partial class App : Application
    {
        private Window m_window;

        /// <summary>
        /// Initializes the singleton application object.  This is the first line of authored code
        /// executed, and as such is the logical equivalent of main() or WinMain().
        /// </summary>
        public App()
        {
            this.InitializeComponent();
            this.UnhandledException += App_UnhandledException;
        }

        /// <summary>
        /// Man
        /// </summary>
        private void App_UnhandledException(object sender, Microsoft.UI.Xaml.UnhandledExceptionEventArgs e)
        {
            Debug.WriteLine($"Unhandled Exception: {e.Exception.Message}");
            Debug.WriteLine($"Stack Trace: {e.Exception.StackTrace}");
            e.Handled = true;
            ShowErrorDialog(e.Exception);
        }

        private async void ShowErrorDialog(Exception ex)
        {
            try
            {
                var window = (Application.Current as App)?.m_window;
                if (window == null) return;

                var dialog = new Microsoft.UI.Xaml.Controls.ContentDialog
                {
                    Title = "Critical Error",
                    Content = $"An unexpected error has occurred:\n\n" +
                              $"Message: {ex.Message}\n\n" +
                              $"Stack Trace:\n{ex.StackTrace}",
                    CloseButtonText = "Close application",
                    XamlRoot = window.Content.XamlRoot
                };

                await dialog.ShowAsync();
            }
            finally
            {
                Application.Current.Exit();
            }
        }



        /// <summary>
        /// Invoked when the application is launched normally by the end user.  Other entry points
        /// will be used such as when the application is launched to open a specific file.
        /// </summary>
        /// <param name="e">Details about the launch request and process.</param>
        protected async override void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs e)
        {
            await LocalFolderService.Instance.InitiateLocalFolder();
            m_window = new MainWindow();
            m_window.Activate();
        }

        /// <summary>
        /// Invoked when Navigation to a certain page fails
        /// </summary>
        /// <param name="sender">The Frame which failed navigation</param>
        /// <param name="e">Details about the navigation failure</param>
        void OnNavigationFailed(object sender, NavigationFailedEventArgs e)
        {
            throw new Exception("Failed to load Page " + e.SourcePageType.FullName);
        }
    }
}