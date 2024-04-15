We're pleased to announce the release of the Passbolt Windows Desktop Application Version 1.0, marking the first stable iteration of the application. This version follows a detailed security audit conducted by Cure53, reflecting our focus on maintaining high security standards. As usual, the audit's findings are available publicly on the passbolt website.

This version also aligns with Passbolt v4.6 feature set, ensuring that users transitioning between the web and the desktop environment have a consistent experience. If you want to know more about the current and future status of the application, checkout this blog article: https://www.passbolt.com/blog/stable-release-of-passbolt-windows-desktop-application

Thank you for your support and for trusting Passbolt. Stay tuned for more updates and the detailed security report.

## [1.0.0] - 2024-04-10
### Added
- PB-29559 - Support v4.6 in desktop app
### Fixed
- PB-32394 As a user defining my passphrase while activating my account I want to know if my passphrase is part of a dictionary on form submission 
- PB-32396 As a user defining my new passphrase while changing it I want to know if my new passphrase is part of a dictionary on form submission
- PB-32401 As an administrator defining the passphrase of the generated organisation account recovery key I want to know if the passphrase is part of a dictionary on form submission
- PB-32407 As a user editing a password I am invited to confirm its edition when this one very weak in a separate dialog on form submission
- PB-32395 As a user defining my passphrase while requesting an account recovery I want to know if my new passphrase is part of a dictionary on form submission
- PB-32397 As a user verifying my private key passphrase while activation my account I do not want to know if my passphrase is part of a dictionary at this stage
- PB-32399 As a user confirming my passphrase while completing an account recovery (Admin approved) I do not want to know if my passphrase is part of a dictionary on form submission
- PB-32398 As a user confirming my passphrase while importing my private key during an account recover I do not want to know if my passphrase is part of a dictionary on form submission
- PB-32404 As a user creating a password from the quickaccess I am invited to confirm its creation when this one is part of a dictionary in a separate dialog on form submission
- PB-32403 As a user updating a password I am invited to confirm its edition when this one is part of a dictionary in a separate dialog on form submission
- PB-32405 As a user auto-saving a password from the quickaccess I should not be notified if the password is part of an exposed dictionary
- PB-32402 As a user creating a password I am invited to confirm its creation when this one is part of a dictionary in a separate dialog on form submission
- PB-32400 As a user confirming my passphrase while importing an account kit on the desktop app I do not want to know if my passphrase is part of a dictionary on form submission
- PB-32406 As a user creating a password I am invited to confirm its creation when this one very weak in a separate dialog on form submission
- PB-32427 As a user creating a password from the quickaccess I am invited to confirm its creation when this one is VERY WEAK in a separate page on form submission
- PB-32351 As a desktop app user I should be able to change my current locale

### Improved
- PB-29289 Make pipelines fail when test jobs output an error
- PB-29106 Merge desktop bext into develop

### Security
- PB-32286 - PBL-11-001 WP1: Insecure Regex pattern allows canNavigate bypass (Medium)
- PB-32290 - PBL-11-005 WP1: Insecure CSP Configuration in renderers (Low)
- PB-32289 - PBL-11-004 WP1: Arbitrary requestId used as topic in background IPC (Medium)
