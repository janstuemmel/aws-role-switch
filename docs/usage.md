# Usage & configuration

## Config

Enter your roles in the editor via `ini` format: 
* Lines prefixed with `#` are comments
* Section headers define the display name of a role and can be prefixed with `profile`, like `[profile my-aws-role]`
* Roles are sorted by first appearance of an item's group, ungrouped items are always on top

| Key   | Value  |
| :---  |  :---  |
| `role_name` | The role's name you want to assume |
| `aws_account_id` | The aws account id where the role is stored |
| `role_arn` (optional) | An aws role arn including account id and role name (replaces `role_name` & `aws_account_id`) |
| `color` (optional) | A css color string, like `#f0f0f0` or `orange` |
| `group` (optional) | The name of a group |
| `region` (optional) | Force a region ([region list](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)) |

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

## Usage

After entering your config, roles will show up in the popup window. You can filter roles via the search input. 

Assuming a role after selection will only work when you are on an aws console tab. 


### Keyboard Shortcuts

| Shortcut | Action  |
| :---  |  :---  |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>l</kbd> | Open popup window |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate up/down |
| <kbd>Enter</kbd> | Assume the selected role |
