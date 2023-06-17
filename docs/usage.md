# Usage & configuration

## Config

Enter your roles in the editor via `ini` format: 
* Lines prefixed with `#` are comments
* Section headers define the display name of a role and can be prefixed with `profile`, like `[profile my-aws-role]`
* Roles are sorted by first appearance of an item's group, ungrouped items are always on top
* You can also define a complete arn to a role (`role_arn`) which replaces `role_name` and `aws_account_id`
* A aws region is forced by setting a `region` key. Check [aws region list](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)

| Key   | Value  |
| :---  |  :---  |
| `role_name` | The role's name you want to assume |
| `aws_account_id` | The aws account id where the role is stored |
| `role_arn` (optional) | An aws role arn including account id and role name (replaces `role_name` & `aws_account_id`) |
| `color` (optional) | A css color string, like `#f0f0f0` or `orange` |
| `group` (optional) | The name of a group |
| `region` (optional) | Force a region |

### Example config

```ini

# A comment

[role-title]
role_name = AdminFullAccess
aws_account_id = 123456789101
color = orangered
group = My awesome account

[role-title-eu-central]
role_arn = arn:aws:iam::123456789101:role/AdminFullAccess
group = My awesome account
region = eu-central-1
```

### Advanced Config

It's possible to use `source_profile` in roles to point to a parent profile. Using parent profiles implicates two things: 
* `target_role_name`: Defining a target role name will exclude the role from being displayed in popup window because it is a source profile. Every child profile will use `target_role_name` as `role_name` if it is not defined.
* `aws_account_id`: Setting this field to the root account alias or id will result in not showing roles that are not associated with `source_profile` in popup on current tab's aws-console.

```ini

[parent]
aws_account_id = my-org
target_role_name = MyRole

# this profile will be shown on active aws-console tab in popup
[child-profile1]
aws_account_id = 123456789101
source_profile = parent

# this profile will not be shown on active aws-console tab in popup
[child-profile2]
aws_account_id = 123456789101
role_name = UserRole
```

Example (see config above):
* You're logged in to aws-console with org alias or id `my-org`
* Your current tab is aws-console
* You open the extensions popup
* `child-profile1` is shown in popup as it is associated with `parent`
* `child-profile2` is **not** shown in popup as it is **not** associated with `parent`


## Usage

After entering your config, roles will show up in the popup window. You can filter roles via the search input. 

Assuming a role after selection will only work when you are on an aws console tab. 


### Keyboard Shortcuts

| Shortcut | Action  |
| :---  |  :---  |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>l</kbd> | Open popup window |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate up/down |
| <kbd>Enter</kbd> | Assume the selected role |
