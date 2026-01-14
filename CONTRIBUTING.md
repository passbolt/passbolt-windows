# Contributing to Passbolt Windows

Thank you for your interest in contributing to Passbolt Windows! This document provides guidelines and instructions for contributing to this project.

Passbolt is an open source password manager for teams, licensed under [AGPL-3.0](LICENSE.txt).

## Contributor License Agreement (CLA)

Before we can accept your contributions, you must sign our Contributor License Agreement (CLA). This is required for all contributors.

Please visit [https://cla-assistant.io/passbolt/passbolt_browser_extension](https://cla-assistant.io/passbolt/passbolt_browser_extension) to review and sign the CLA.

## Prerequisites

Before you start contributing, ensure you have the following installed:

- **Visual Studio >= 2019** ([download](https://visualstudio.microsoft.com/downloads/))
- **Visual Studio UWP workload**
- **Microsoft Edge WebView2** ([download](https://developer.microsoft.com/en-us/microsoft-edge/webview2/))
- **Node.js** (v16 or higher) for webview development
- **Passbolt API >= v4.2.0** for testing (with desktop plugin enabled)

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone git@github.com:YOUR_USERNAME/passbolt-windows.git
cd passbolt-windows
```

### 2. Open in Visual Studio

Open the project folder in Visual Studio. The solution will be automatically detected.

### 3. Install JavaScript Dependencies

The project includes JavaScript/React webviews that require npm dependencies:

```bash
# Install Rendered webview dependencies
cd passbolt/Webviews/Rendered
npm install

# Install Background webview dependencies
cd ../Background
npm install
```

### 4. Configure Passbolt API

Enable desktop application support in your Passbolt API:

**Docker:**
```bash
PASSBOLT_PLUGINS_DESKTOP_ENABLED=true
```

**Manual configuration** (`/etc/passbolt/passbolt.php`):
```php
return [
  "passbolt" => [
    "plugins" => [
      "desktop" => [
        "enabled" => true
      ]
    ]
  ]
];
```

### 5. Run the Application

Click the Start button in Visual Studio's top menu to build and run the application.

## Code Style

### EditorConfig

The project uses EditorConfig (`.editorconfig`) for consistent formatting:
- **JavaScript:** 2-space indentation
- **C#:** 4-space indentation
- **Line endings:** LF

### ESLint (JavaScript)

JavaScript code must pass ESLint checks:

```bash
# Check for linting errors
cd passbolt/Webviews/Rendered
npm run lint

# Auto-fix linting issues
npm run lint:eslint-fix
```

The same commands apply to the `Background` webview directory.

### General Guidelines

- Follow existing code patterns and conventions
- Keep code simple and readable
- Add comments only where the logic isn't self-evident

## Testing

All tests must pass before submitting a pull request.

### C# Tests (MSTest)

**Via Visual Studio:**
1. Open the solution in Visual Studio
2. Right-click on the test project in Solution Explorer
3. Select "Run Tests"
4. View results in Test Explorer

**Via Command Line:**
```bash
MSBuild /t:Restore
MSBuild /t:Build /p:Configuration=Release
MSBuild /t:VSTest /p:Configuration=Release
```

### JavaScript Tests (Jest)

```bash
# Rendered webview tests
cd passbolt/Webviews/Rendered
npm test

# With coverage
npm run test:coverage

# Background webview tests
cd passbolt/Webviews/Background
npm test
```

## Submitting a Pull Request

1. **Create an issue first** - For significant changes, open an issue to discuss the proposed changes before starting work

2. **Fork the repository** - Create your own fork on GitHub

3. **Create a feature branch** - Use a descriptive name:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes** - Write clear, descriptive commit messages

5. **Ensure quality:**
   - All tests pass
   - Linting passes with no errors
   - Code follows existing patterns

6. **Submit the PR** - Open a pull request against the `develop` branch with:
   - Clear description of the changes
   - Reference to related issues (if any)
   - Screenshots for UI changes (if applicable)

## Code Review Process

- All pull requests are reviewed by Passbolt team members
- Reviewers may request changes or ask for clarification
- Once approved, Passbolt staff will merge the PR
- Please be patient - reviews may take some time depending on complexity

## Reporting Bugs

Use [GitHub Issues](https://github.com/passbolt/passbolt-windows/issues) to report bugs.

Please include:
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Environment details (Windows version, Visual Studio version, etc.)
- Screenshots or error messages if applicable

Check existing issues before creating a new one to avoid duplicates.

## Security Vulnerabilities

**Do NOT report security vulnerabilities through public GitHub issues.**

Instead, please email **security@passbolt.com** with details about the vulnerability.

For more information, see Passbolt's [security policy](https://help.passbolt.com/faq/security).

## Getting Help

- **Community Forum:** [https://community.passbolt.com](https://community.passbolt.com)
- **Documentation:** [https://help.passbolt.com](https://help.passbolt.com)
- **General Information:** [https://www.passbolt.com](https://www.passbolt.com)

Thank you for contributing to Passbolt!
