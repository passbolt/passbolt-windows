Version 0.4.0 (Release Candidate) of the desktop app from Passbolt is now available, packed full of improvements and new functionalities.

With this release, users can now configure MFA directly from the desktop application with Yubikey and TOTP, just like you would in the browser edition (Duo support is in the works for a future update). Please note that this feature is currently available for user-level settings only; admin-level settings are coming soon. Once MFA is set up using Yubikey or TOTP, you can use them for authentication within the desktop app. The experience even mirrors the web version, making the transition even smoother. 

Another highlight of this release, to bolster security and safeguard against potential threats, your account kit is now signed with your private key. This ensures that the account is authenticated and it’s verified during the import process. It confirms that no changes have been made to your exported Account Kit data and verifies that it comes from a trusted source. 

Upgrade to version 0.4.0 to take advantage of these improvements. Thank you for using and supporting passbolt!

## [0.4.0] - 2024-11-06
## Windows application
### Added
- PB-28378 - MFA screen should be display depending on the application
- PB-28304 - CSRF token not working when not using MFA
- PB-27605 - As a sign-in user I can setup Yubikey as 2FA on the desktop application
- PB-27606 - As a sign-in user I can setup TOTP as 2FA on the desktop application
- PB-27608 - As a user I can sign-in with TOTP and Yubikey as 2FA on the desktop application

### Security
- PB-25688 - As a desktop app exporting the account kit I should sign it with openpgp
