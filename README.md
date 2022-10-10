# Comit
## About
Comit (pronounced "comet") is a command-line tool that helps you draft commit messages for mob sessions. You can choose to copy the message to your clipboard or let Comit commit it for you as well.

## Usage
There are three commands you can use:
- `comit init` once to setup comit for your team
- `comit` copies the generated message to your clipboard.
- `comit <commit message>` copies the generated message including your commit messsage. Pass the flag `-c` to also run `git commit`.
- `comit reset` will clear all configs and take you back to zero.
- `comit --help` is your friend for all the other available commands.