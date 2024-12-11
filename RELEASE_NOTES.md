release song: https://www.youtube.com/watch?v=VmtU-bLyReU

Passbolt Windows Desktop application v1.4.0 is a maintenance update that prepares for the upcoming v5 release of the API, introducing beta support for the v5 resource type format within the existing user interface and addressing reported issues.

This release is particularly valuable for maintainers of clients or integrations, offering an early preview of the v5 resource type format to aid in planning for future adaptations. While previous content types will remain supported until version 6, the new content types expand functionality, empowering technical teams to manage a broader range of credentials. Stay tuned—a blog article will be released soon to explain how to enable v5 support and begin testing your integrations.

This release also addresses multiple bugs reported by the community, including a blank screen issue that occurred when administrators customized RBAC settings. Additionally, the session timeout issue has been resolved. Users will now enjoy extended sessions while actively using the application, aligning the behavior with what they are accustomed to in the browser application.

Thank you to our community for your continued support and your reports.

## [1.4.0] - 2024-11-12s
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
