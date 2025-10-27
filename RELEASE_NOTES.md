Passbolt Windows Application 2.5.0 introduces standalone notes to store sensitive secrets beyond passwords. This release also delivers several long-awaited usability improvements on the main workspaces that make the day-to-day experience smoother.

## Standalone notes

It is now possible to create notes as standalone resources, no longer tied to a password or TOTP entry. This offers a dedicated resource type for text-based secrets that don’t fit into existing supported types such as passwords, TOTPs, or custom fields.

Standalone notes benefit from the same permissions, encryption, and audit trail as passwords, ensuring they remain just as secure and shareable. Each note supports up to 50 KB of text, leaving ample room for certificates, SSH keys, or other long-form secrets that Passbolt plans to support natively in the future. Import and export flows have been updated accordingly and any imported resources that contain only a description will now be recognised and created as standalone notes.

## Resizable sidebars: more space where it matters

Both the main workspace and the Users & Groups workspace now feature sidebars that can be resized, giving users more control over how they view their data. This improvement makes it easier to read long folder names and navigate deeply nested folder structures.

The ability to resize sidebars adds to the overall customisation of the interface, complementing existing options such as adjusting the width of the main workspace grid columns or choosing which information to display. Once adjusted, the sidebar adapts smoothly to the preferred width, and a quick double-click on the handle resets it to the default size.

## Improve stability

This release includes stability improvements, notably fixing a black screen that could occur at startup due to an issue in the internal communication layer. The team also addressed crashes related to the operating system’s idle mode, where the application sometimes failed to recover after resuming. These fixes should enhance overall stability.

## Miscellaneous Improvements

This release is also packed with minor bug fixes and performance improvements, notably in group management where large updates are now split into smaller requests. This change reduces the load on the API and resolves timeout issues that could occur when many changes were applied to the same group at once. For the full list of changes, check out the changelog.


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
- PB-45984 Fix webviews synchronization can lead to black screen
- PB-45998 Fix Windows app should not crash when an unexpected requestId is received

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