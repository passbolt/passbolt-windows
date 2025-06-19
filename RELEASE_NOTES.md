release song: https://www.youtube.com/watch?v=VmtU-bLyReU

The Passbolt Windows App version 2.0.1 introduces the first features built on encrypted metadata, enhancing resource management and customisation. This update lays the groundwork for future improvements and delivers practical everyday benefits.

Resources using encrypted metadata now support multiple URIs. For example, addresses like app.example.com and admin.example.com can be linked to the same credential, helping the browser extension recognise credentials across multiple domains.

This release also addresses multiple bugs reported by the community, including a blank screen issue that occurred when administrators customized RBAC settings. Additionally, the session timeout issue has been resolved. Users will now enjoy extended sessions while actively using the application, aligning the behavior with what they are accustomed to in the browser application.

Icons and colours can now be set for resources with encrypted metadata, using a method compatible with KeePass for easy import and export. This visual distinction helps users quickly navigate large workspaces.

A new density setting is available to adjust grid spacing, providing a clearer, more comfortable view. Users can easily toggle this in the workspace column settings as needed.

The Passbolt interface now supports Ukrainian and Slovenian languages, enabling native speakers to use the tool comfortably without relying on English.

Additionally, resource owners now receive notifications on the day their passwords expire, supporting teams in managing rotation policies effectively.

This update includes several bug fixes and maintenance improvements based on community feedback. Thanks to everyone who contributed by reporting issues and suggesting improvements.

For full technical details of everything in this release, check out the changelog.


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
