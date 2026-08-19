## Introduction

Passbolt Windows 2.12.0 introduces explicit permission confirmation prompts to improve control over shared resources. This release also addresses a security issue related to MFA policy enforcement and includes usability improvements and adds DUO authentication support for MFA providers.

## Sharing transparency 

Users now receive an explicit confirmation dialog before creating items in shared folders or editing shared resources. This provides full permission transparency before changes take effect, preventing accidental privilege exposure. 

In addition, when a group appeared in the access list, its individual members were not visible, making it difficult to assess the actual reach of shared access. Group members are now displayed directly within the dialog.

As the first stage of a broader security initiative, future updates will extend these confirmations to folder move operations and offer enhanced permission preview dialogs. 

## Edition and Subscription Management

The Passbolt edition is now visible in the application footer, and Terms & Credits links have moved to the main navigation menu. 

## DUO authentication

The Windows app is now supporting the Duo authorization, which was a limitation on the previous versions. 

## Resource Suggestions

Suggested resources in the browser extension are now ranked using an improved URL relevance algorithm. Exact URL matches appear first, followed by parent paths and domain matches, allowing users to select the correct credentials faster and with fewer autofill errors.

## Security Improvements
This release addresses a low-severity vulnerability that allowed a user with a valid account and MFA access to remember their device for a month even when the organisation had disabled that option. Reported by security researcher Damir, the issue affected Passbolt API versions up to 5.13.0 and is now enforced correctly at the API level in 5.14.0. 
