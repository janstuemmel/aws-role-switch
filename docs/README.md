# Documentation

## Config

The plugin can be configured with a `./aws/config` style `ini` file format. An entry can have following attributes:

* `role_name`: Name of the role you want to assume
* `aws_account_id`: Account id in which the role lives
* `color`: Optional color represented as `css` color string (e.g. `#fff`, `orange`) 
* `group`: Optional group  

```ini
# A comment

[role-title]
role_name = AdminFullAccess
aws_account_id = 123456789101
color = orangered
group = My awesome account
```

## Usage

After you entered a few entries, you can open the popup window and see a list of roles. Filter for group, id or title with the search bar.

Keyboard shortcuts:
* <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>l</kbd>: Open the popup window 
* <kbd>↑</kbd> / <kbd>↓</kbd>: Navigate up/down
* <kbd>Enter</kbd>: Assume role