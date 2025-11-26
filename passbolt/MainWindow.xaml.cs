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
using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;
using passbolt.Controllers;

namespace passbolt
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainWindow : Window
    {
        private WebView2 webviewRendered { get => Rendered; }
        private WebView2 webviewBackground { get => Background; }
        private MainController mainController;

        /// <summary>
        /// Constructor for the main page
        /// </summary>
        public MainWindow()
        {
            // Initialize the page
            this.InitializeComponent();
            this.mainController = new MainController(webviewRendered, webviewBackground);
            this.AppWindow.SetIcon(@"Assets/favicon.ico");
        }

        /// <summary>
        /// This method is called when the rendered web view completes navigation.
        /// </summary>
        private async void Rendered_NavigationStarting(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
        {
            await this.mainController.RenderedNavigationStarting(sender, args);
        }

        /// <summary>
        /// This method is called when the background web view completes navigation.
        /// </summary>
        private async void Background_NavigationStarting(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
        {
            await this.mainController.BackgroundNavigationStarting(sender, args);
        }

        /// <summary>
        /// This method is called when the background web view completes navigation.
        /// </summary>

        private async void Background_NavigationCompleted(WebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            await this.mainController.BackgroundNavigationCompleted(sender, args);
        }

        /// <summary>
        /// This method is called when the rendered web view completes navigation.
        /// </summary>
        private void Rendered_NavigationCompleted(WebView2 sender, CoreWebView2NavigationCompletedEventArgs args)
        {
            this.mainController.RenderedNavigationCompleted(sender, args);
        }
    }
}
