Passbolt windows application 2.8 brings new productivity feature tags visible in the grid, along with security hardening and performance improvements.

## Tags visible in the grid (Passbolt Pro)

Tags are now displayed directly in the resources grid, making it easier to identify and filter resources without opening the resource details view.
A new tags column shows the tags associated with each resource. Tags are displayed in alphabetical order and remain clickable, allowing users to filter the workspace by selecting a tag directly from the grid.
When multiple tags exist, the grid displays as many as possible within the column width and indicates additional tags using a counter with a tooltip showing the remaining tags.
This update also modernises the tag codebase and lays the groundwork for further improvements to tagging capabilities.

## Security improvements

The Passbolt team is currently preparing its First Level Security Certification (CSPN) with the French National Cybersecurity Agency (ANSSI). This release includes some fixes following the CSPN pre-audit evaluation done in partnership with Quarkslab and an external audit of SCIM provisioning by Cure53. This release addresses the findings identified during both audits.

One notable issue is around CSV injection, e.g. when CSV exports could be susceptible to formula injection when opened in spreadsheet software. This issue was known and classified as out of scope, as exported CSV files are not intended to be opened in spreadsheets but with the password manager they were generated for. However we revisited this decision and settled for a security-by-default approach: CSV export is now disabled by default, fixing the bigger problem of credentials being potentially exported in plaintext. Organisations that still rely on it can re-enable the feature through configuration. Encrypted KDBX export remains available and is the recommended format for credential portability. Looking ahead, we plan to support the FIDO CFX format in a future release to further standardise credential import and export across tools.

Content Security Policy enforcement has been extended to close remaining gaps, further reducing the attack surface in case of a breach. Because the browser extension serves its own code locally rather than relying on the API, sensitive operations were already well protected by design against server-side injection.

Additionally an external security audit of SCIM provisioning has been completed, and this release includes fixes for a number of the findings. We are actively working through the remaining issues and will publish the full audit results once that work is done. SCIM will exit beta and ship on Passbolt Cloud as soon as all findings are resolved. 
Maintenance & performance
This release brings a major upgrade to React 18, resulting in up to 20% faster rendering and the elimination of rare visual glitches that could cause flashes during navigation.

First load times have also improved substantially. Large organisations with thousands of resources will notice the biggest difference, with initial data processing now up to 20% faster.

Bear with us, more optimisations are already in the pipeline for future releases.

## Conclusion

As usual, the release is also packed with additional improvements and fixes. Check out the changelog to learn more.
Many thanks to everyone who provided feedback, reported bugs, and contributed to making passbolt better!
