using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Web.WebView2.Core;

namespace passbolt_windows_tests.UnitTests
{
    internal class MockCoreWebView2NewWindowRequestedEventArgs
    {
        public bool Handled { get; set; }

        public static explicit operator CoreWebView2NewWindowRequestedEventArgs(MockCoreWebView2NewWindowRequestedEventArgs v)
        {
            throw new NotImplementedException();
        }
    }
}
