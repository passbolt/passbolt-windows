The Passbolt Windows application version 2.10.0 introduces a new PIN code resource type, along with the usual round of security and dependency updates.

## PIN code resource type

The Passbolt Windows application 2.10.0 introduces a dedicated Pin Code resource type for securely storing standalone PINs such as door access codes, safes, alarm systems, SIM codes, or device unlock codes.

Unlike workarounds based on passwords or custom fields, Pin Codes now have their own dedicated form, icon, validation, and generation flow. PINs are strictly numeric and support 4 to 12 digits in accordance with the ISO 9564-1 standard.

Users can create, view, copy, and generate PIN codes directly from the windows application optionally alongside a secure note. A dedicated PIN code column can also be displayed in the resource grid, while administrators can enable or disable the resource type from the administration settings (only available into the browser extension).

## Maintenance and security

As usual, this release ships some third-party dependency upgrades and security advisory fixes, with no user-visible impact.
