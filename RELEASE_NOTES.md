We're pleased to announce the release of the Passbolt Windows Desktop Application Version 1.1, marking the first stable iteration of the application. This version follows a detailed security audit conducted by Cure53, reflecting our focus on maintaining high security standards. As usual, the audit's findings are available publicly on the passbolt website.

This version also aligns with Passbolt v4.6 feature set, ensuring that users transitioning between the web and the desktop environment have a consistent experience. If you want to know more about the current and future status of the application, checkout this blog article: https://www.passbolt.com/blog/stable-release-of-passbolt-windows-desktop-application

Thank you for your support and for trusting Passbolt. Stay tuned for more updates and the detailed security report.

## [1.2.0] - 2024-07-01
### Improved
- PB-33686 As a user I should be signed out after browser update
- PB-33610 As a desktop i should inform the user about an untrusted certificate
- PB-33609 as a desktop i should not accept http trusted domain

### Fixed
- PB-33595 As a user running an instance serving an invalid certificate I should be able to sync the gpgkeyring
- PB-33727 Fix session extension, service worker awaken and user instance storage not set
- PB-33801 Remove active account cache in memory

### Maintenance
- PB-33541 Chrome Extension Manifest upgrade to version 3
- PB-33728 - Add support of 4.8 BEXT on the windows app