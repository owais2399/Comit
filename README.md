# Comit (pronounced "comet")
## About
Comit is a command-line tool that helps you draft commit messages for mob sessions. You can choose to copy the message to your clipboard or let Comit commit it for you as well.

## Usage
There are three commands you can use:
- `comit --init <parentIssue> <childIsse?>`<br>
sets the config to use the `parentIssue` and `childIssue` tickets. The `childIssue` is optional and can be left blank in case there is no sub-issue ticket.
- `comit`<br>
copies the commit message to your clipboard.
- `comit <commit message>`<br>
runs `git commit <commit message>`.