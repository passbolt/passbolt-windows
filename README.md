	      ____                  __          ____
	     / __ \____  _____ ____/ /_  ____  / / /_
	    / /_/ / __ `/ ___/ ___/ __ \/ __ \/ / __/
	   / ____/ /_/ (__  |__  ) /_/ / /_/ / / /_
	  /_/    \__,_/____/____/_.___/\____/_/\__/

	Open source password manager for teams
	(c) 2021 Passbolt SA
	https://www.passbolt.com

## License

Passbolt - Open source password manager for teams

(c) 2023 Passbolt SA

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
Public License (AGPL) as published by the Free Software Foundation version 3.

The name "Passbolt" is a registered trademark of Passbolt SA, and Passbolt SA hereby declines to grant a trademark
license to "Passbolt" pursuant to the GNU Affero General Public License version 3 Section 7(e), without a separate
agreement with Passbolt SA.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not,
see [GNU Affero General Public License v3](http://www.gnu.org/licenses/agpl-3.0.html).

## About passbolt

Passbolt is an open source password manager for teams. It allows to securely share and store credentials.
For instance, the wifi password of your office, or the administrator password of a router, or your organisation social
media account password, all of them can be secured using Passbolt.

You can try a demo of passbolt at [https://demo.passbolt.com](https://demo.passbolt.com).

You will need to install a plugin, you can find a step by step guide in the website
[help section](https://www.passbolt.com/help/start/firefox)

Or, of course, you can use the code in this repository to build it yourself and run it!


## About passbolt desktop app

Passbolt Desktop App is a UWP (Universal Windows Platform) application that provides a modern and flexible way to manage your passwords securely. With Passbolt Desktop App, you can store your passwords and other sensitive information in a centralized location, and you can access them from any Windows 10 device.

The app is built using the UWP platform and it leverages the power of Webview2 to provide a rich and engaging user interface. With Webview2, Passbolt Desktop App can display web-based content within the app, such as the Passbolt web interface, and it can interact with the content programmatically.

By using UWP and Webview2, Passbolt Desktop App provides a consistent and seamless user experience across all Windows 10 devices. The app can adapt to the device it's running on, providing a user interface that's optimized for the screen size and input method of the device. With Passbolt Desktop App, you can manage your passwords securely, and you can do it in a way that's flexible and convenient for you.

## Prerequisites

Before building this application, you need to have the following installed on your machine:

- Visual Studio 2019 or later with the UWP workload.
- The WebView2 runtime installed. You can download it from the [Microsoft Edge WebView2 download page](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).
- Link your bext application : npm link
- Link your background webview to the bext (go to Background folder): npm run link passbolt_-_open_source_password_manager

## Building the application

To build the application, follow these steps:

1. Clone the repository or download the source code.
2. Open the solution file `passbolt-windows.sln` in Visual Studio.
3. In the Solution Explorer, right-click on the project and select "Manage NuGet Packages".
4. Search for "Microsoft.Web.WebView2" and install it.
5. Press F5 to build and run the application.

## Packaging the application

### Building with Visual code

To create a package for the application, follow these steps:

1. In Visual Studio, right-click on the project and select "Store" > "Create App Packages".
2. Follow the wizard to create a package for the app.
3. The package will be saved to the output directory of your project.

### Building with Command Line

To build the Passbolt Desktop App using the command line, you can use the MSBuild command-line tool, which is included with Visual Studio. Follow these steps to build the app using the command line:

1. Open a command prompt and navigate to the project directory.
2. Run the following command to build the solution:

``MSBuild /t:Restore;Build /p:Configuration=Release;Platform=x64``

This command restores the NuGet packages and builds the solution in Release mode for the x64 platform.

3. After the build completes, the app package will be available in the `bin\x64\Release` directory.

## Running tests

### Running tests with Visual code

Passbolt Desktop App includes a suite of unit tests to ensure that the app functions correctly. To run the unit tests, follow these steps:

1. Open the solution in Visual Studio.
2. In the Solution Explorer, right-click on the `PassboltDesktopApp.UnitTests` project and select "Run Tests".
3. The unit tests will run, and the results will be displayed in the Test Explorer.

### Running tests with command lines

To run the Passbolt Desktop App unit tests using the command line, you can use the dotnet test command. Follow these steps to run the tests using the command line:

1. Open a command prompt and navigate to the project directory.
2. Run the following command to restore the NuGet packages:

``MSBuild /t:Restore``

3. Run the following command to build the solution:

``MSBuild /t:Build /p:Configuration=Release``

4. Run the following command to run the unit tests:

``MSBuild /t:VSTest /p:VSTestPath=<Path to vstest.console.exe> /p:VSTestArguments="/Settings:<Path to appsettings.json> /Logger:trx" /p:Configuration=Release``

This command runs the unit tests in Release mode and generates a test results file named PassboltDesktopApp.UnitTests.trx.

After the tests complete, you can view the results in Visual Studio or any other tool that supports TRX format.

## Checking for Outdated .NET NuGet Dependencies in Visual Studio
1. Open your project in Visual Studio.
2. In the Solution Explorer, right-click on the project and select "Manage NuGet Packages".
3. In the NuGet Package Manager, click on the "Updates" tab to see a list of all available updates for your NuGet packages.
4. You can use this information to determine if any of your NuGet packages need to be updated.

## Deploying the application

To deploy the application, you can distribute the package file or upload it to the [Microsoft Store](https://docs.microsoft.com/en-us/windows/msix/packaging-tool/create-app-package-with-packaging-tool#step-6-upload-your-package-to-the-store). For more information on deploying UWP apps, refer to the [official documentation](https://docs.microsoft.com/en-us/windows/msix/deploy-uwp-app). 
