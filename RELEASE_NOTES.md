Passbolt Windows Application 2.3.1 is fixing an issue introduced during the version 2.1.0. When a user wanted to copy its password or its username, the clipboard was not working anymore and we solved it by adding the Clipboard feature done during the bext version 5.3.2 . 

The new clipboard flush timer lets you copy secrets just long enough to use them; clipboard data is automatically cleared when the countdown (30s) expires, significantly reducing the risk of accidental exposure or leaks from forgotten clipboard content.

Many thanks to everyone who reported issues. Your feedback made this release possible and solves issues to all users today.

## [2.3.1] - 2025-09-04

### Fixed
- feature/PB-45095_Windows-app-copy-username-or-password-does-nothing