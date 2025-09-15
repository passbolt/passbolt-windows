Passbolt Windows Application 2.3.2 fixes an issue introduced in version 2.3.0. The clipboard protection feature, which cleared the clipboard 30s after copying a secret, was causing the application to crash. Clipboard flushing has been temporarily disabled to allow users to access their secrets. We are investigating how to fix the crash and re-enable this security feature in a future release. 

Many thanks to everyone who reported the issue.

## [2.3.2] - 2025-09-10

### Fixed
- PB-45154 - Windows app : Clipboard should persist to unblock alarm issue
