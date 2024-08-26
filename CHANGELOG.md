# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.3.1] - 2024-08-26
### Fixed
- PB-33861: Resources with personal field set to null should be considered as personal resources
- PB-34314: Fix shadow-dom autofill fields
- PB-34236: Fix Retrieving folder activities displaying no data

### Maintenance
- PB-34313: Add resources type retrieval requirements documentation
- PB-34259: E2EE WP1 - Transform dtos from v4 to v5
- PB-34260: E2EE WP1 - Display resource sidebar information section in v5
- PB-34261: E2EE WP1 - Display resource sidebar activity section in v5
- PB-34262: E2EE WP1 - Display resource sidebar description section in v5
- PB-34263: E2EE WP1 - Display copy username to clipboard from more menu using v5
- PB-34264: E2EE WP1 - Display resource grid using v5
- PB-34265: E2EE WP1 - Display resource grid contextual menu using v5
- PB-34266: E2EE WP1 - Display quickaccess resource view page in v5
- PB-34267: E2EE WP1 - Display quickaccess home page in v5
- PB-34268: E2EE WP1 - Display inform menu in v5
- PB-34269: E2EE WP1 - Autofill resources from Quickaccess in v5 format
- PB-34270: E2EE WP1 - Make resource entity compatible with v4 and v5
- PB-34271: E2EE WP1 - Display inform and toolbar suggested resources badge CTA in v5
- PB-34272: E2EE WP1 - Search resource in webapp using v5
- PB-34287: E2EE WP1 - Create password resource from webapp in v5 format
- PB-34288: E2EE WP1 - Create standalone TOTP resource in v5 format
- PB-34289: E2EE WP1 - Edit password resource in v5 format
- PB-34290: E2EE WP1 - Edit standalone TOTP resource in v5 format
- PB-34291: E2EE WP1 - Edit resource description from sidebar in v5 format
- PB-34292: E2EE WP1 - Delete resource(s) in v5 format
- PB-34293: E2EE WP1 - Share resource(s) in v5 format
- PB-34294: E2EE WP1 - Import resource(s) in v5 format
- PB-34295: E2EE WP1 - Export resource(s) in v5 format
- PB-34296: E2EE WP1 - Move resource(s) in v5 format
- PB-34297: E2EE WP1 - Create password resource from quickaccess in v5 format
- PB-34298: E2EE WP1 - Auto-save password resource from quickaccess in v5 format
- PB-34299: E2EE WP1 - Make resource entity compatible only with v5
- PB-34311: E2EE WP1 - Make resource V4 and V5 compatible in both ways
- PB-34315: E2EE WP1 - Transform DTO to V4 for API and adapt resource validation to v5
- PB-34391: E2EE WP1 - Enforce resource type id should be required and not null
- PB-34392: E2EE WP1 - Validate Metadata.uris as array of string, and maxLength

### Security
- PB-34237: Upgrade vulnerable library i18next-parser
- PB-34305: Upgrade lockfile-lint library on passbolt_api package-lock.json
- PB-34422: Remove grunt-browserify dev dependency from browser extension

## [1.3.0] - 2024-07-25

### Maintenance
- PB-34181 - As a windows app I should support the 4.9.0 version of the browser extension

### Fixed
- PB-33915 - When a an unexpected error is displayed, the 'try again' button seems to have no effect
- PB-34091 - Fix the import account kit button after the webview refreshing
- PB-33916 - On import/auth screen the heart icons tooltip displays "Server 1.2.0" instead of "Client 1.2.0”

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

## [1.1.0] - 2024-05-15
### Added
- PB-32931 As administrator, I see SSO and Directory Sync health checks in Passbolt API Status page
- PB-33065 As an administrator I can add a fallback property to map my organisation AD user username
- PB-33070 Request passphrase when exporting account kit
- PB-33176 Desktop app adapt code to work with 4.7.0
- PB-33074 As a desktop app user I should be able to add a resource to a folder by drag and drop

### Fixed
- PB-32420 Fix double calls to PwnedPassword API service
- PB-32631 Fix healthCheck Entity to support air gapped instances
- PB-33066 As AD, I should not see directorySync and SSO checks if they are disabled
- PB-33067 After an unexpected error during setup, recover or account recovery, only the iframe reload and the port cannot reconnect
- PB-33410 Fix Chrome Extension frozen and unusable after some period of inactivity
- PB-33444 When dragging resources on folders, the folders keep the \"hover\" state visually
- PB-33442 The keepSessionAlive seems not to trigger
- PB-33323 Dragging a private folder to a shared folder seems to be blocked in \"computing changes\" state
- PB-33445 Sometimes the drag and drop is broken and the \"info\" tooltip stays static on the UI

### Maintenance
- PB-22623 Start service worker in an insecure environment
- PB-22640 As a signed-in user the inform call to action should remain after the port is disconnected only for MV3
- PB-22644 The passbolt icon should detect if the user is still connected after the service worker awake
- PB-23928 Handle when the extension is updated, the webIntegration should be destroy and injected again
- PB-29622 Simulate user keyboard input for autofill event
- PB-29946 When the service worker is shutdown and a navigation is detected the service worker do not reconnect port and stay in error mode
- PB-29965 Use a dedicated service to verify the server
- PB-29966 Update apiClient to support form data body and custom header
- PB-29967 Use a dedicated service to do the step challenge with the server
- PB-29968 use a dedicated service to check the user authentication status
- PB-29969 Use a dedicated service to logout the user
- PB-29988 Update the alarm in the class StartLoopAuthSessionCheckService to use the property periodInMinutes
- PB-29989 Put the alarm listener at the top level for the StartLoopAuthSessionCheckService to check the authentication status
- PB-29990 Move PassphraseStorageService keep alive alarm listener in top level
- PB-30272 Add message service in the app content script in order to reconnect the port from a message sent by the service worker
- PB-30273 On the post logout event the service worker should reconnect port that needs to receive the post logout message
- PB-30274 Add message service in the browser integration content script in order to reconnect the port from a message sent by the service worker
- PB-30310 Improve invalid groups users sanitization strategy
- PB-30335 Use timeout instead alarms for service worker
- PB-30336 Use timeout instead alarms for promise timeout service
- PB-30337 Put the alarm listener at the top level for the passphraseStorageService to flush passphrase after a time duration
- PB-30341 Remove alarms for toolbar controller
- PB-30342 Use timeout instead of alarm for the resource in progress cache service to flush the resource not consumed
- PB-30374 Check if AuthService from styleguide is still used in the Bext otherwise remove it
- PB-30375 Improve CI unit test performance by running them in band
- PB-32291 Cleanup legacy code and unused passbolt.auth.is-authenticated related elements
- PB-32335 Split PassphraseStorageService to put the KeepSessionAlive feature on its own service
- PB-32345 Ensures on the desktop app during import account that the file to import is taken into account
- PB-32597 Ensure ToolbarController are set on index.js
- PB-32598 Ensure add listener from authentication event controller are set on index.js
- PB-32599 Ensure add listener from StartLoopAuthSessionCheckService are set on index.js
- PB-32604 Ensure add listener from on extension update available controller are set on index.js
- PB-32602 Ensure add listener from user.js are set on index.js
- PB-32603 Ensure add listener from ResourceInProgressCacheService are set on index.js
- PB-32915 Update code to remove the destruction of the public web sign-in on port disconnected
- PB-32916 Update code to remove the destruction of the setup on port disconnected
- PB-32917 Update code to remove the destruction of the recover on port disconnected
- PB-33018 Automate browser extension npm publication
- PB-33024 Ensure only stable tags of the styleguide are published to npm
- PB-33024 Ensure only stable tag of the browser extension are sent for review or publish to the store
- PB-33061 Create account temporary storage
- PB-33062 Use temporary account storage for setup process
- PB-33063 Use temporary account storage for recover process
- PB-33064 Use temporary account storage for account recovery process
- PB-33068 Remove beta information for the windows app
- PB-33235 Convert formData file into a json serializable in offscreen
- PB-33225 MV3 beta rollout
- PB-33297 Extension update available should store the state if user signed in
- PB-33304 Fix extension update available service
- PB-33307 Browser extension version bump to v4.7.5-rc.0
- PB-33307 Add debug to capture onInstall reason details
- PB-33321 Fix local storage loading on extension update

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

[Unreleased]: https://github.com/passbolt/passbolt-windows/compare/v1.0.0...HEAD
[0.6.0]: https://github.com/passbolt/passbolt-windows/compare/v0.6.0...v1.0.0