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

using System.Threading.Tasks;
using Microsoft.UI.Xaml.Controls;
using Microsoft.Web.WebView2.Core;
using passbolt.Controllers;
using Windows.Storage;

namespace passbolt_windows_tests.UnitTests
{
    public class MockMainController: MainController
    {

        public CoreWebView2NewWindowRequestedEventArgs newWindowRequestedEventArgs;
        public MockMainController(WebView2 webviewRendered, WebView2 webviewBackground, StorageFolder backgroundFolder,
            StorageFolder renderedFolder) : base(webviewRendered, webviewBackground)
        {
            this.backgroundFolder = backgroundFolder;
            this.renderedFolder = renderedFolder;
        }

        public override void NewWindowRequested(CoreWebView2 sender, CoreWebView2NewWindowRequestedEventArgs args)
        {
            // keep the original behavior
            base.NewWindowRequested(sender, args);
            newWindowRequestedEventArgs = args;
        }

        public override void SetWebviewSettings(WebView2 webView)
        {
            base.SetWebviewSettings(webView);
        }

        public override async Task LoadRenderedWebview()
        {
           await base.LoadRenderedWebview();
        }

        public override async Task LoadBackgroundWebview()
        {
            await base.LoadBackgroundWebview();
        }
        public override async Task BackgroundInitialisation()
        {
            await base.BackgroundInitialisation();
        }

    }
}
