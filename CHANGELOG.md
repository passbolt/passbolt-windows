# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [1.4.0] - 2024-11-12

### Added
- PB-16113 As LU I should be able to drag and drop a resource I own on a shared tag
- PB-35412 WP3-2.1 Implement MetadataPrivateKey entity to support metadata private key
- PB-35419 WP3-2.3 Implement MetadataPrivateKeys collection to support collection of metadata private keys
- PB-35420 WP3-2.5 Implement MetadataKey entity to support metadata key
- PB-35421 WP3-2.6 Implement MetadataKeys collection to support collection of metadata keys
- PB-35422 WP3-2.2 Implement decryptOne on DecryptMetadataPrivateKeys service to decrypt a metadata private key
- PB-35424 WP3-2.4 Implement decryptAll on DecryptMetadataPrivateKeys service to decrypt a metadata private keys collection
- PB-35425 WP3-2.7 Implement decryptAllFromMetdataKeysCollection on DecryptMetadataPrivateKeys service to decrypt metadata private keys on MetadataKeys collection
- PB-35426 WP3-2.8 Implement the function findAll on the FindMetadataKeys service to retrieve metadata keys from the API and decrypt any metadata private keys found if any
- PB-35427 WP3-2.9 Implement the function findAllForSessionStorage on the FindMetadataKeys service to retrieve metadata keys for the Session storage
- PB-35428 WP3-2.10 Adapt resource entity to support both encrypted metadata and non encrypted metadata
- PB-35429 WP3-2.11 Implement decryptAllFromForeignModels on DecryptMetadata service to decrypt metadata on a resource collection
- PB-35430 WP3-2.12 Decrypt metadata of v5 resources types when retrieving resources from the API
- PB-35684 WP3-3.4 Implement encryptOneForForeignModel on EncryptMetadata service to encrypt metadata on a resource
- PB-35686 WP3-3.5 Encrypt metadata of v5 resource types when editing new resource types
- PB-35688 WP3-3.1 Add necessary capabilities to resource types collection and entity to support v5 types in the UI
- PB-35692 WP3-4.1 implement metadata types settings entity to support metadata types settings
- PB-35693 WP3-4.2 Implement findSettings on MetadataTypesSettingsApiService to retrieve metadata types settings
- PB-35694 WP3-4.3 Implement findTypesSettings on FindMetadataSettingsService to retrieve metadata types settings entity
- PB-35695 WP3-4.4 IImplement MetadataTypesSettingsLocalStorage to store and retrieve metadata types settings from local storage
- PB-35696 WP3-4.5 Implement findAndUpdateTypesSettings on FindAndUpdateMetadataSettingsService to retrieve metadata types settings from the API and store them in the local storage
- PB-35698 WP3-4.7 Implement GetOrFindMetadataTypesSettingsController to provide capability to retrieve the metadata types settings from the UI
- PB-35700 WP3-4.6 Implement getOrFindMetadataTypesSettings on GetOrFindMetadataSettingsService to retrieve metadata types settings from store or from the API and store them in the local storage
- PB-36225 WP3-4.10 Create resource service should determine personal resource only with permissions of the destination folder
- PB-35701 WP3-4.8 WebApp/QuickApp lazy loads metadata types settings and provide it to components that need them
- PB-35703 WP3-4.10 WebApp CreateResource component creates resources of type v5
- PB-35704 WP3-4.11 Webapp CreateStandaloneTotp component creates resources of type v5
- PB-35705 WP3-3.6 Webapp EditResource component updates resources of type v5
- PB-35707 WP3-4.12 Encrypt metadata of v5 resource types when creating new resources
- PB-35710 WP3-5.1 Migrate import resources controller logic into a dedicated service
- PB-35718 WP3-5.2 Resources import parsers should determine imported resource type based on imported data and configuration
- PB-35721 WP3-5.3 import resources of type v5
- PB-35755 WP3-6.2 Share resources of type v5
- PB-35853 WP3-4.14 Add resource types v5 to the list of supported resource types
- PB-35893 WP3-7.1 Implement MetadataKeysSettingsEntity to support metadata keys settings
- PB-35895 WP3-7.2 Implement findSettings on MetadataKeysSettingsApiService to retrieve metadata keys settings
- PB-35896 WP3-7.3 Implement findKeysSettings on FindMetadataSettingsService to retrieve metadata keys settings as entity
- PB-35897 WP3-7.4 Implement MetadataKeysSettingsLocalStorageService to store and retrieve metadata keys settings from local storage
- PB-35898 WP3-7.5 Implement findAndUpdateKeysSettings on FindAndUpdateMetadataSettingsService to retrieve metadata keys settings from the API and store them in the local storage
- PB-35899 WP3-7.6 Implement getOrFindMetadataKeysSettings on GetOrFindMetadataSettingsService to retrieve metadata keys settings from storage or from the API and store them in the local storage
- PB-35900 WP3-7.7 Enforce metadata encryption using the metadata key as dictated by the metadata key settings
- PB-35901 WP3-5.6 Implement encryptAllFromForeignModels on EncryptMetadata service to encrypt metadata on a collection of resources
- PB-35902 WP3-9.1 Implement MetadataKeysSessionStorageService to store and retrieve metadata keys from session storage
- PB-35903 WP3-9.2 Implement findAndUpdateAll on FindAndUpdateKeysSessionStorageService to retrieve metadata keys from the API and store them in the local storage
- PB-35904 WP3-9.3 Implement getOrFindAll on GetOrFindMetadataKeysService to retrieve metadata keys from storage or from the API and store them in the local storage
- PB-35907 WP3-9.5 decrypt metadata service should retrieve keys from session storage
- PB-35912 WP3-2.16 Implement MetadataPrivateKeyData entity to support decrypted metadata private key data
- PB-35914 WP3-2.19 Update metadata_key_type to be aligned with the API value for the shared_key
- PB-35915 WP3-2.18 update the resource metadata object_type to be aligned with the API
- PB-35947 WP3-2.17 Update MetadataPrivateKey entity to support MetadataPrivateKeyData
- PB-35982 WP3-2.20 allow a metadata_key_id to be set when metadata_key_type is set to 'user_key'
- PB-35989 WP3-4.13 QuickApp components creates resource of type v5 accordingly to metadata settings
- PB-36187 WP3-9.5.1 Refactor decryptMetadataService to welcome keys coming from getOrFindMetadataKeys
- PB-36226 Create an event to get the account of the user
- PB-36230 WP3-5.3.2 Encrypt EncryptMetadataService.encryptAllFromForeignModels should not crash if v4 resource type are sent for encryption
- PB-36231 WP3-5.3.3 ImportResourceService should encrypt a v5 resource type metadata
- PB-35706 WP3-3.7 Webapp EditStandaloneTotp component updates resources of type v5
- PB-35741 WP3-5.5 Export resources of type v5
- PB-35743 WP3-5.4 Migrate export resources controller logic into a dedicated service
- PB-35753 WP3-6.3 Migrate update group controller logic into a dedicated service
- PB-35771 WP3-8.1 Implement SessionKeyEntity entity to support session key
- PB-35772 WP3-8.2 Implement SessionKeysCollection collection to support collection of session keys
- PB-35773 WP3-8.3 Implement SessionKeysBundleEntity entity to support persisted collection session keys as stored on the API or local storage
- PB-35857 WP3-8.9 Implement SessionKeysBundlesSessionStorageService to store and retrieve session keys bundles from session storage
- PB-35858 WP3-8.4 Implement SessionKeysBundlesCollection collection to support collection of session keys bundle entity
- PB-35862 WP3-8.5 Implement decryptOne on DecryptSessionKeysBundles service to decrypt a session key bundle
- PB-35863 WP3-8.6 Implement decryptAll on DecryptSessionKeysBundlesService service to decrypt a sessions keys bundles collection
- PB-35864 WP3-8.7 Implement findAll on SessionKeysBundlesApiService to retrieve session keys bundles from the API
- PB-35867 WP3-8.8 Implement findAllBundles on FindSessionKeysService to retrieve sessions keys bundles from the API
- PB-35869 WP3-8.10 Implement findAndUpdateAllBundles on FindAndUpdateSessionKeysSessionStorageService to retrieve session keys bundles from the API and store them in the session storage
- PB-35876 WP3-8.11 Implement getOrFindAllBundles on GetOrFindSessionKeysService to retrieve session keys from store or from the API and store them in the session storage
- PB-35877 WP3-8.12 Implement getOrFindAllByForeignModelAndForeignIds on GetOrFindSessionKeysService to retrieve session keys from storage or from the API and store them in the session storage
- PB-35878 WP3-8.20 DecryptMetadataService should use the session keys when decrypting metadata of a collection of resources
- PB-35879 WP3-8.13 Implement decryptWithSessionKey on DecryptMessageService
- PB-35881 WP3-8.14 Implement GetSessionKeyService crypto service
- PB-35886 WP3-8.15 Implement create on SessionKeysBundlesApiService to create a session keys bundle on the API
- PB-35887 WP3-8.16 Implement delete on SessionKeysBundlesApiService to delete a session keys bundle on the API
- PB-35888 WP3-8.17 Implement update on SessionKeysBundlesApiService to update a session keys bundle on the API
- PB-35889 WP3-8.18 Implement encryptOne on EncryptSessionKeysBundlesService to encrypt session keys bundle session keys prior to persist the data
- PB-35890 WP3-8.19 Implement save on SaveSessionKeysService to persist sessions keys on API
- PB-35948 WP3-8.21 Implement SessionKeysBundleDataEntity entity to support persisted collection decrypted session keys bundle
- PB-36286 WP3-6.7 ShareDialog should not have to share resources by passing resources and all its details to the service worker
- PB-36509 WP3-6.5 Migrate move resource controller logic into a dedicated service
- PB-36511 WP3-6.8 Migrate share folder logic from controller/share model to service
- PB-36513 WP3-6.10 Migrate move folder controller logic into a dedicated service
- PB-36520 WP3-8.22 DecryptMetadataService should persists session keys changes after a decryptAllFromForeignModels is performed
- PB-36522 WP3-1.1 Remember the passphrase for a minimum default period after sign-in to allow smooth decryption of the metadata
- PB-36523 WP3-1.2 Updating resources local storage requiring user passphrase should request the user passphrase if not present in the session storage
- PB-36559 WP3-6.8.1 Implement findFoldersService findAllByIds to support request batch splitting
- PB-36560 WP3-6.8.2 Implement getOrFindFoldersService to retrieve folders from local storage or update if with API
- PB-36561 WP3-6.8.3 Implement findByIdsWithPermissions on findResourcesService and findFoldersService
- PB-36583 WP3-8.4.1 Add same user id build rules for SessionKeysBundlesCollection
- PB-36598 WP3-2.21 Validate GPG armored message to support iOS format
- PB-36897 WP4-1.2 Migration Storybook new CSF format
- PB-36945 WP3-8.24 GetOrFindSessionKeys getOrFindAll shouldn't crash if no sessions keys bundle is found

### Improved
- PB-35702 WP3-4.9 WebApp DisplayResourcesWorkspaceMainMenu should be able to determine the type of content to create
- PB-35718 WP3-5.2 Resources import parsers should determine imported resource type based on imported data and configuration
- PB-35802 WP3-3.2 WebApp lazy loads resource types and replace resourceTypeSettings usage with it
- PB-35803 WP3-3.2 QuickApp lazy loads resource types and replace resourceTypeSettings usage with it
- PB-35987 WP3-4.13 QuickApp components creates resource button should be display only when possible
- PB-35988 WP3-4.13 Inform components creates or save resources should be display only when possible

### Security
- PB-36967 Upgrade vulnerable library cross-spawn
### Fixed
- PB-35709 Fix: theme back to default randomly after refresh or navigation
- PB-35714 Fix: Infinite loading when user try an account recovery process on another profile with an extension installed
- PB-35861 Fix: Wrong resource type is displayed in resource sidebar
- PB-36123 Fix: Filtering resources with a second group should not enter in a filtering loop between the first and second selected groups
- PB-36236 Fix: Resource type requirements when retrieving resources to export resulting in cardinality issue with some environment
- PB-36501 GITHUB-217 Fix share dialog autocomplete sorting
- PB-35131 GITHUB-11 Fix: Windows app blank screen after sign-in
- PB-36601 GITHUB-13 Fix: Windows app does not allow the user to update the passphrase
- PB-35224 GITHUB-8 Fix: Windows app session timeout and alarm polyfill issue

### Maintenance
- PB-35762 WP3-6.1 Migrate share resources model logic into a dedicated service
- PB-35788 WP3-3.2 Handle resource types settings using an HOC
- PB-36972 Update progress service to propose an API to control step count to finish

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