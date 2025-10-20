# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.5.0] - 2025-10-22

### Added
- PB-39068 WP5-5.6 Implement a Service RotateResourcesMetadataKeyService that proceed with the rotation of the key
- PB-39069 WP5-5.8 Implement a new method in MetadataKeysServiceWorkerService to call for  to expire a key
- PB-39071 WP5-5.1 Implement a new method in MetadataKeysApiService to expire a shared metadata key
- PB-39072 WP5-5.4 Implement a new Service UpdateMetadataKeysService to process with the expiration of a key
- PB-39073 WP5-5.2 Implement a new API service MetadataRotateKeysResourcesApiService to retrieve the first page of data to rotate
- PB-39074 WP5-5.3 Implement a new method in MetadataKeysApiService to register the rotated data on the API
- PB-39075 WP5-5.7 Implement a Controller RotateResourcesMetadataKeyController to run the rotation process
- PB-39076 WP5-5.9 Implement a new method in MetadataKeysServiceWorkerService to call passbolt.metadata.rotate-resources-metadata for  with the new Key
- PB-39078 WP5-5.10 Implement the ConfirmMetadataRotationDialog
- PB-39094 WP5-6.2 Display the rotate key button when multiple metadata key are active
- PB-43253 Workspace resizable sidebars
- PB-44582 lastpass example csv import with totp success
- PB-45385 SN - WP1.1 Create the entity SecretDataV5StandaloneNoteEntity
- PB-45389 SN - WP1.3 Update ResourceFormEntity to include secret SecretDataV5StandaloneNoteEntity
- PB-45400 SN - W2.1 Add new resource type in DisplayContentTypesAllowedContentTypesAdministration
- PB-45404 SN - WP2.2 Add new resource type in DisplayResourcesWorkspaceMainMenu
- PB-45406 SN - WP2.3 Update passbolt default resource type icons to include the new resource type icon
- PB-45408 SN - WP2.4 Update DisplayResourcesListDetails to handle the correct subtitle for standalone note and add the same for standalone custom fields
- PB-45412 SN - WP3.1 Apply a minimum height to the resource workspace ‘others’ dialog used to create other resource types
- PB-45413 SN - WP3.3 Increase the height of the notes textarea to use the maximum available space in the resource creation dialog
- PB-45414 SN - WP3.3 Add “hide” button when the note is decrypted to hide it again
- PB-45417 SN - WP2.5 Update the “other” dialog to add the standalone note in the content type list in v5
- PB-45424 SN - WP3.4 Ensure Import/Export is working as expected with standalone notes
- PB-45464 GMUO - WP1.1 Create new collection ‘GroupUpdateCollection’
- PB-45465 GMUO - WP1.2 Migrate group update logic to optimise the request on the API
- PB-45466 GMUO - WP1.3 Adapt group update progress bar mechanism
- PB-45476 WP5-6.3 Create events with controller to rotate and resume rotation of a metadata key

### Fixed
- PB-43218 Date field icons should not be replaced with the copy icon in the SSO settings and expiry resource dialogs
- PB-45239 Folders are not displayed in the correct order (GITHUB #568)
- PB-45329 add TOTP toString handling similar to other csv exports
- PB-45402 Add missing icon property to resource types schema definition
- PB-45450 Fix account kit export with big private armored keys
- PB-45458 Remove Organisation Settings max-width
- PB-45733 Fix quickaccess resource creation with encrypted metadata

### Maintenance
- PB-44253 Upgrade vulnerable library form-data
- PB-44593 Upgrade i18next to v24x
- PB-45182 Major upgrade for copy-anything (Medium)
- PB-45183 Minor upgrade for browserslist (Low)
- PB-45184 3rd party Github Actions should be pinned (Medium)
- PB-45401 Enforce the requirement of the property object_type for custom fields
- PB-45484 Fix low security vulnerability dependency with web-ext to 8.10.0
- PB-45583 Review and clean up npm overridden dependencies
- PB-45601 Update the "Upgrade to Passbolt Pro" buttons URL

## [2.4.0] - 2025-09-17

### Added
- PB-43921 - Increase directory sync report dialog size
- PB-44393 ZK - WP5.1 As an administrator I should be able to enable zero knowledge mode
- PB-44646 ZK - WP5.3 Add share metadata private keys to MetadataKeysSettingsEntity
- PB-44641 ZK - WP5.4 Create UpdateMetadataSettingsPrivateKeyService to to be able to disabled zero knowledge mode
- PB-44631 ZK - WP5.5 Update SaveMetadataKeysSettingsController to be able to disabled zero knowledge mode
- PB-44757 ZK - WP5.6 As an administrator with missing metadata keys I should not be able to change metadata settings

### Fixed
- PB-44638 - Password expiry should not be removed when password is not updated
- PB-44604 - Fix regular expression on public key metadata validation
- PB-45060 - Fix custom fields json schema properties type
- PB-44933 - Fix setup a new user should have missing key set

### Maintenance
- PB-44594 - Upgrade xregexp to 5.1.2

## [2.3.2] - 2025-09-10

### Fixed
- PB-45154 - Windows app : Clipboard should persist to unblock alarm issue

## [2.3.1] - 2025-09-04

### Fixed
- PB-45095: Copy username or password did nothing

## [2.3.0] - 2025-08-27

### Added
- PB-44201: E2EE The organisation settings offer now a simplified way to activate metadata encryption and the new resource types
- PB-42205: E2EE encrypted metadata and new resource types are activated by default after the first administrator setup
- PB-43255: Add support for multiple uri import export on kdbx files
- PB-43110: ZK - WP4.2 As a signed-in user I should not be allowed to upgrade resources with missing key situation
- PB-43712: Translate the application in Czech
- PB-43939: ZK - WP3.2 Add an app event to get or find the metadata keys settings
- PB-43980: Add support for custom field import export on kdbx files
- PB-44080: ZK - WP4.1 Create a dialog explaining the missing key situation
- PB-44081: ZK - WP4.3 As a signed-in user I should not be allowed to create resources with missing key situation in the resource workspace
- PB-44090: ZK - WP4.4 As a signed-in user I should not be allowed to edit resources with missing key situation
- PB-44091: ZK - WP4.5 As a signed-in user I should not be allowed to share resources with missing key situation
- PB-44094: ZK - WP4.6 As a signed-in user I should not be allowed to import resources with missing key situation
- PB-44095: ZK - WP4.7 As a signed-in user I should not be allowed to move resources with missing key situation
- PB-44096: ZK - WP4.8 As a signed-in user I should not be allowed to move folders with missing key situation
- PB-44206: ZK - WP4.14 As administrators I cannot trigger the encrypted metadata migration if I have missing metadata keys
- PB-44212: CU - WP5.2 Update ExternalResourceEntity buildDtoFromResourceEntityDto to support custom fields
- PB-44296: ZK - WP4.16 As a signed-in user I should not be allowed to move shared folders into personal folders with missing key situation
- PB-44327: Display sub-folders in breadcrumbs
- PB-44374: Extend notes v5 max length to 50_000

### Fixed
- PB-43296: Displaying resource activities should not crash the application when a resource activity does not have related user or group
- PB-43652: The sentence to change the passphrase in the user settings workspace should have a space after.
- PB-43657: Resources loading became noticeably slower after migrating to encrypted
- PB-43667: Cancelling the user passphrase request should not trigger an error when sharing missing metadata key
- PB-43676: Cancelling the user passphrase should not freeze the create resource dialog
- PB-43719: After importing resources from Bitwarden the URIs are not separated correctly
- PB-43784: Display the progression of the encryption of metadata in the import dialog
- PB-43906: User should be notified of any errors while loading comments
- PB-44079: Update/Create a method in resourceLocalStorage.js to bulk delete resources
- PB-44161: As a user I should not see the resource description and note warning message if only one of them is concerned
- PB-44273: Activities are not loaded when new resource is clicked after load more activities of a previous resource
- PB-44638: Password expiry should not be removed when password is not updated
- PB-44668: The create menu import operation should be actionable when encrypted metadata plugin is not available

### Maintenance
- PB-43908: Move logic of commentModel file to a service and update assertions in controllers
- PB-44076: Create a Controller to handle Resource Delete
- PB-44077: Create a dedicated Service to handle resource deletion

### Security
- PB-43730: Upgrade vulnerable library brace-expansion

## [2.2.1] - 2025-08-01

### Fixed
- PB-43969 CSRF token in request body or headers does not match or is missing on the windows app

## [2.2.0] - 2025-07-15

### Added
- PB-43269 Create the entity CustomFieldEntity
- PB-43271 Create the entity collection CustomFieldsCollection
- PB-43273 Create the entity SecretDataV5StandaloneCustomFieldsCollection
- PB-43275 Update the resource types schema definitions
- PB-43277 Update the ResourceMetadataEntity
- PB-43278 Update the ResourceFormEntity
- PB-43279 Update the Secret Entities
- PB-43283 Display a new entry the create/edit dialog to set custom fields on the left sidebar and the menu
- PB-43284 Create the CustomFieldForm for the create/edit dialog
- PB-43285 Handle the CustomFieldForm warnings and limitation
- PB-43286 Update create/edit resource to select secret custom fields for a standalone custom fields
- PB-43287 Display the Custom Fields section on the right sidebar
- PB-43289 Display standalone custom fields in the component DisplayResourceCreationMenu
- PB-43290 Display standalone custom fields in the component DisplayResourcesWorkspaceMainMenu
- PB-43291 Display the URIs section in the right sidebar
- PB-43374 Add validation on keys and values of each elements of custom fields for the resource form entity
- PB-43377 Add set collection into entity v2
- PB-43145 Find a list of resources based on IDs and that are suitable for local storage from the API
- PB-43146 Find a list of resources based on a parent folder id and that are suitable for the local storage from the API
- PB-43133 Display padding below tags in resource workspace left sidebar
- PB-42185 The folder caret that expands or collapses folders in the tree should have a larger clickable area to make it easier to use
- PB-43222 Improve the group dialog to match the new share dimensions
- PB-43147 Find and update resources based on parent folder id for the local storage
- PB-43148 Create a connector for finding resources based on a parent id for the styleguide to call it later
- PB-43149 Create a ResourcesServiceWorkerService to call the service worker for resource related operations
- PB-43150 Implement the optimised call in the Styleguide when filtering by a folder
- PB-43151 Optimise the data retrieved from the API such that updates are not done if unnecessary
- PB-43156 Clarify implications for backups and other devices before changing the passphrase in the user settings workspace
- PB-43489 Display unexpected error if there is any issue during the secret decryption

### Fixed
- PB-43109 Fix: from the sidebar when upgrade from v4 to v5 goes wrong the error message in the notification
- PB-43118 Hide the "Share metadata keys" button in the users workspace action bar for the current signed-in user
- PB-43215 Fix account recovery creator name
- PB-43063 Fix group edit dialog double warning message has broken UI
- PB-43117 Hide the "Share metadata keys" button in the users workspace action bar after sharing missing metadata keys with a user
- PB-43064 Fix group edit dialog can show a mix of error and warning messages
- PB-43150: fix folder not being reloaded
- PB-43424 Clicking on the "open in a new tab” call to action  in the quick application should open the resource url in a new tab
- PB-43108 Display attention required icon on "metadata keys" label in the user details sidebar if the user is not having access to some metadata keys
- PB-43217 The default icon stroke width is too thick in the grid and doesn't match the custom icons
- PB-43220 Copy URL field action button lacks padding and is broken in the SSO settings
- PB-43168 Align vertically resources workspace select check-boxes
- PB-43211 The feedback message notifying the administrator when a metadata key has been shared with a user contains a typo
- PB-43471 Center vertically the icon on the create and edit dialog


## [2.1.0] - 2025-06-16

### Added
- PB-41365 Support options for ECC Key generation
- PB-42936 Translate the application into Ukrainian
- PB-42897 Upgrade resource to v5 from information panel
- PB-42896 PB-42896 Display an “Upgrade Resource to v5” card in the information panel
- PB-42895 Upgrade v4 password string resources to v5 default
- PB-42894 Upgrade a single v4 resource to v5
- PB-42860 Translate the application into Slovenian	
- PB-42796 Add a limit for multiple URIs
- PB-42788 As a user I can access the resource appearance customization from the create/edit
- PB-42704 Display missing metadata keys information in the user sidebar
- PB-42658 Refresh the users local storage after sharing missing metadata keys
- PB-42598 Retrieve missing_metadata_keys_ids information when retrieving signed-in user details with the getOrFindMe method of the UserModel
- PB-42590 Write the background color and icon ID into KDBX files
- PB-42589 Read the background color and icon ID from KDBX files
- PB-42588 Adapt the ResourceIcon component to handle IconEntity
- PB-42587 Add the AddResourceAppearance form part for the resource dialog
- PB-42586 Add the ‘appearance’ metadata field in the resource dialog
- PB-42585 Add IconEntity as an associated entity in MetadataEntity
- PB-42584 Create IconEntity to hold custom icon and color information
- PB-42570 Create a method canSuggestUris using canSuggestUri
- PB-42543 Allow users to navigate to the additional URIs from the SelectResourceForm
- PB-42536 Allow user to add additional URIs from the Create and Edit Resource v5 dialogs
- PB-42534 Display resource additional URIs badge in the filtered resource of the QuickApplication
- PB-42533 Display resource additional URIs badge in the suggested resource of the QuickApplication
- PB-42530 Display resource additional URIs in the details of a resource of the QuickApplication
- PB-42529 Display resource additional URIs badge in the browsed resource of the QuickApplication
- PB-42528 Display resource additional URIs badge in the resource details sidebar
- PB-42527 Display resource additional URIs badge in the resources grid
- PB-42526 Create the ResourceUrisBadge component to handle resource additional URIs badge and the tooltip displaying them
- PB-42130 Add shareMetadataKeyPrivate event to AppEvents

- PB-42129 Create ShareMetadataKeyPrivateController and use ShareMetadataKeyPrivateService to perform the action
- PB-42127 Create ShareMetadataKeyPrivateService and implement shareMissing method
- PB-42114 Add create or share method to metadata private key api service
- PB-42368 Update EncryptOne method from EncryptMetadataPrivateKeysService to allow encryption without signature
- PB-42134 Update DisplayUsersContextualMenu to display a Share metadata keys action if key is missing
- PB-42133 Update DisplayUserWorkspaceActions to display a Share metadata keys action if key is missing
- PB-42132 Implement Dialog confirmation when administrator wants to share keys with an user
- PB-42131 Add share method into metadataKeysServiceWorkerService to perform the UI action
- PB-42126 Add cloneForSharing method into MetadataPrivateKeyEntity
- PB-42124 Create ShareMetadataPrivateKeysCollection
- PB-42110 Update userModel updateLocalStorage method to include missing_metadata_keys_ids option
- PB-42109 Add missing_metadata_keys_ids property to UserEntity
- PB-41617 Add comfortable grid
- PB-39042 Display upgrade resource to v5 card

### Improved
- PB-42883 Improve performance by skipping the decryption of unchanged metadata.
- PB-41654 Transform workspaces shifter into a dropdown
- PB-42184 Increase the share dialog width to accommodate longer strings from translations or user names

### Fixed
- PB-41760 On some conditions, scrollbars can appear and break the design
- PB-42561 The folder tree caret when scrolling appeared in the wrong orientation
- PB-43008 Fix dragging v5 resources into shared folders should trigger the share strategy on the resource
- PB-42985 Translate the button manage account in the profile dropdown
- PB-42789 Fix userAvatar on userInformationPanel with attention required svg
- PB-42702 Fix contains missing_metadata_keys_ids miss match
- PB-42606 Fix the Quick App Login form CTA spinner should not be displayed over the text of the button
- PB-42272 Fix display v5 resource metadata in the grid when filtering by group
- PB-42077 Update navigation menu icon width
- PB-41649 Re-align components in the left sidebar
- PB-41643 Remove TOTP MFA (profile workspace) border around the QR code and card
- PB-41642 Update Turn off MFA primary button to be red
### Maintenance
- PB-43012 Change authentication_token parameter to token for get the user key policies endpoint
- PB-42790 Replace legacy Icon by SVG
- PB-42572 Update Quickaccess HomePage to use the canSuggestUris
- PB-42571 Update isSuggestion in resource entity to use canSuggestUris
- PB-42569 Create and merge canSuggestUri into a service
- PB-42978 Check object_type is defined and valid before metadata encryption

### Security
- PB-42613 Upgrade browser extension OpenPGP.js to the latest version
- PB-42700 Upgrade vulnerable library undici and lockfile-lint-api
- PB-42391 Update Papaparse library


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