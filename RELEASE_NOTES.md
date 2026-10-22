## Introduction

Passbolt Windows 2.15.0 "Mad World" makes permission changes easier to review when moving resources, and brings Offline Mode to PIN codes. The passkeys MFA provider cannot be used within the Passbolt Windows application. This release also includes security fixes and performance improvements.


## Safer permission handling during resource moves

Passbolt Windows 2.15.0 brings the permission review introduced in 2.13 to moves of resources and folders. Creating a resource in a shared folder, editing a shared resource and now moving items all ask for the same explicit confirmation.
A move needs this step because placing a resource in a shared folder, or taking it out of one, can change who has access to it. Previously, users chose between keeping the current permissions and applying those of the destination folder, without seeing what either option would produce. Getting it right meant anticipating the outcome, which could be confusing.

From this version, every move follows the destination folder strategy: permissions inherited from the origin parent folder are removed, and those of the destination folder take their place. Before saving, Passbolt shows who will gain, lose or keep access, and this proposal can be refined with the usual granular control, one user or group at a time. Nothing changes until the user confirms, and the operation can still be cancelled.

## Large organization group management performance

The release also tackles one of the most requested improvements on adding a user to a large group with many shared resources. This operation is now more than twice as fast and is achieved through optimizing the underlying database queries. This cuts the wall time for adding a user to a group having access to 300 resources from 1.19 seconds to 514 milliseconds. Now, administrators can spend less time waiting when onboarding users or reorganizing access in large groups with many shared resources.

## Security Improvements

Passbolt Windows 2.15.0 brings targeted security improvements and hardening measures resulting from internal assessments and external research.
Clipboard Auto-Clear Protection: Thanks to a report from external researcher Alex J, an edge case has been fixed where a malicious website could intercept, copy or cut events to cancel the clipboard-clearing timer. Copied secrets are now reliably cleared from the clipboard as intended.

SCIM Token Enforcement (Pro Edition): Expired SCIM bearer tokens are now strictly rejected to prevent unauthorized ongoing access to provisioning endpoints. Administrators also receive proactive health checks and daily notifications, when the token is used and nearing expiration.
A dedicated security bulletin will be published soon. It will provide more details on each of the resolved issues, including their potential impact and how they were addressed. 

Updating to Passbolt Windows 2.15.0 is recommended to benefit from these security improvements.

## Conclusion

Many thanks to everyone who provided feedback, reported bugs and contributed to making Passbolt better.
