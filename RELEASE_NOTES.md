Passbolt Windows Application 2.4.0 ships with the zero-knowledge for encrypted metadata feature available with API 5.5.0. Zero-knowledge for encrypted metadata is intended for organisations that prioritise maximum privacy and can do without server-side auditability. In this mode, the server never receives the shared metadata private key and therefore cannot access any resource metadata.

When a new user joins, the server does not automatically share the key with them. Instead, administrators are notified by email once the user has completed their activation and is ready to receive access. From the Users & Groups workspace, administrators can then review the situation and share the key when the time is right.

Until a user receives the key, their experience is intentionally limited: actions that depend on the shared metadata key, such as sharing a resource, moving a private item into a shared folder, or creating content meant to be shared, are blocked. 

To know more about the encrypted metadata zero-knowledge mode, check out [this blog post](https://www.passbolt.com/blog/the-road-to-passbolt-v5-encrypted-metadata-and-other-core-security-changes-2).

Many thanks to everyone who took the time to file issues and suggest improvements. 
Check out the changelog for more information.

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