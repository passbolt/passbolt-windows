Passbolt Windows Application 2.7.0 introduces full compatibility with dynamic role management, allowing the Windows application to support additional roles that better align with internal policies and compliance requirements. This release also adds drag & drop user assignment to groups and implements stronger protection against clickjacking and deceptive overlays. 

##  Dynamic Role Management Compatibility

The Windows application is now fully compatible with the Dynamic Role Management system introduced in version 5.8. While the creation and definition of roles remain exclusive to the browser extension, this application strictly enforces the associated scopes and constraints.

The default Admin and User roles remain fixed. The Admin role retains access to all capabilities and cannot be restricted, while the User role respects any defined restrictions but cannot perform delegated administrative tasks.
Users assigned to custom roles are also fully supported. The application recognizes the specific capabilities granted to these new roles, currently limited to two per instance. As the scope of dynamic roles expands in the future, the Windows application will adapt to support additional use cases.

As the scope of dynamic roles expands in future updates based on community feedback, the Windows application will continue to evolve to support these new use cases.

## Drag & drop users to groups

Managing group membership often requires repetitive actions when working with large teams or frequently changing group structures. Administrators can now add users to a group by dragging them directly onto it from the Users & Groups workspace. This removes the need to open and edit each group individually, making day-to-day group management faster and more fluid.

## Stronger protection against clickjacking and deceptive overlays

Clickjacking and overlay techniques aim to trick users into clicking something different from what they believe they are interacting with. This release reinforces defenses against these UI-level attacks in edge-case conditions, including scenarios where a compromised context tries to influence user interactions.

In practice, this extra layer of strengthening helps ensure users cannot be guided into interacting with sensitive Passbolt components when those components are not fully visible and clearly presented to them.

## Miscellaneous improvements

As usual, this release includes fixes and smaller improvements intended to improve the overall experience. For the full list of changes, please refer to the changelog.
Many thanks to everyone who provided feedback and helped refine these features. 
