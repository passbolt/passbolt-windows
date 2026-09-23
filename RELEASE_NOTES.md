## Introduction

Passbolt Windows 2.14.0 is an alignment with the latest browser extension code to make sure that the different security aspects and bugs are aligned. The release  includes improvements on the security layer in the windows application to strengthen the security model. 

## Avoid secrets to be retained in Windows clipboard history

Previously, when a secret was copied using the Windows application, it could remain in the Windows clipboard history. This is now prevented, so copied secrets are no longer retained in the operating system’s clipboard history.

## Previously, when a secret was copied using the Windows application, it could remain in the Windows clipboard history. This is now prevented, so copied secrets are no longer retained in the operating system’s clipboard history.

In the Windows application, a trusted domain is linked for different interactions and is used to target the API. Domain validation is now stricter than before, with each part of the domain checked to ensure it exactly matches the domain imported during onboarding in the Windows application.

## Conclusion

As usual, release 2.14.0 has dependency updates and new security features.