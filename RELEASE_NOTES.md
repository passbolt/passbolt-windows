## Introduction

Passbolt Windows 2.13.0 imakes permission changes easier to review, and adds several security features. This release also introduces new session management tooling and additional safeguards for Passbolt Pro.

## Clearer permission confirmation changes

Permission changes are now easier to understand before they take effect, helping users avoid accidental access changes. New badges clearly show whether a permission is being added, modified, or deleted, so users can see exactly what will change at a glance.

Deleted permissions can also be rolled back to their original state before confirmation, making access changes easier to review and adjust.

## Security

### Last login dates only available for administrators

Privacy has also been strengthened by restricting users’ last login dates to administrators only, reducing unnecessary exposure of sensitive account activity.

### SCIM administrators protected against deletion (Pro Edition)
SCIM providers can no longer delete Passbolt administrators by default, helping prevent an identity provider from accidentally locking an administrator out.
Organisations that intentionally manage administrator removal through SCIM can disable this protection by updating your configuration.

If you installed Passbolt with packages, open /etc/passbolt/passbolt.php and add or update the plugins section:

[...]
// plugins configuration.
'plugins' => [
    'scim' => [
        'security' => [
            'allowDeleteAdministrators' => true
        ]
    ],
],
[...]

If you installed Passbolt with docker:

PASSBOLT_PLUGINS_SCIM_SECURITY_ALLOW_DELETE_ADMINISTRATORS=true

## Miscellaneous Improvements

Administrators are now notified whenever any user is deleted, giving them better visibility into account removals across the organisation. Previously, notifications were sent only when an administrator was deleted.

## Conclusion

As usual, release 2.13.0 has dependency updates. Many thanks to Luca Crippa, Ashik Mohamed, meifukun and to everyone who provided feedback, reported bugs, and contributed to making passbolt better!
