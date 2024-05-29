We're pleased to announce the release of the Passbolt Windows Desktop Application Version 1.1. This version aligns with Passbolt v4.7 feature set and allows users to use the drap and drop feature to move their folders and resources.

Thank you for your support and for trusting Passbolt.

## [1.1.0] - 2024-05-17
## Changelog
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

### Maintain
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