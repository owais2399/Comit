#! /usr/bin/env node
import { program } from "commander";

import copy from "./commands/copy.js";
import init from "./commands/init.js";
import showConfig from "./commands/showConfig.js";
import reset from "./commands/reset.js";
import set from "./commands/set.js";
import setTicket from "./commands/setTicket.js";
import delChildTicket from "./commands/delChildTicket.js";
import branch from "./commands/branch.js";
import prTitle from "./commands/prTitle.js";
import prHeader from "./commands/prHeader.js";
import addMember from "./commands/addMember.js";
import delMember from "./commands/delMember.js";
import update from "./commands/update.js";
import newTeam from "./commands/newTeam.js";
import checkUpdatesIfApplicable from "./utils/updater.js";
import setTeam from "./commands/setTeam.js";
import delTeam from "./commands/delTeam.js";

program.version("1.2.8", "-v, --version");
await checkUpdatesIfApplicable();
program
  .description("Copy commit message to clipboard")
  .argument("[commit-msg]", "commit message")
  .option(
    "-a",
    "stages all files in the current working directory, same as git add ."
  )
  .option("-c", "commits to git instead of copying to clipboard")
  .option("-p", "pushes to remote, same as git push")
  .option(
    "-x",
    "stages, commits, and pushes the changes to remote, combination of -a -c and -p"
  )
  .action((commitMsg) => {
    const options = program.opts();
    copy(commitMsg, options["a"], options["c"], options["p"], options["x"]);
  });

program
  .command("init")
  .description("Starts the config initialization wizard")
  .action(init);

program
  .command("show")
  .description("Displays the current config, if set")
  .action(showConfig);

program.command("reset").description("Resets the set config").action(reset);

let setCommand = program.command("set");

setCommand
  .description("Sets members active")
  .option("-a", "sets all members active")
  .argument("[uniqueInitials...]", "Space-separated unique initials of members")
  .action((uniqueInitials) => set(uniqueInitials, program.opts()["a"], true));

setCommand
  .command("team")
  .argument("<name>", "Name of the team to set")
  .action((name) => setTeam(name));

program
  .command("unset")
  .description("Sets members inactive")
  .option("-a", "sets all members inactive")
  .argument("[uniqueInitials...]", "Space-separated unique initials of members")
  .action((uniqueInitials) => set(uniqueInitials, program.opts()["a"], false));

program
  .command("parent")
  .description("Sets the parent ticket")
  .argument("<ticket>", "Parent Ticket")
  .action((ticket) => setTicket(ticket, "parentTicket"));

let child = program.command("child");

child
  .command("del")
  .description("Deletes the child ticket")
  .action(delChildTicket);

child
  .description("Sets the child ticket")
  .argument("<ticket>", "Child Ticket")
  .action((ticket) => setTicket(ticket, "childTicket"));

program
  .command("branch")
  .description("Copies a generated branch name to clipboard")
  .argument("<desc>", "One-line space-separated description")
  .action(branch);

let pr = program.command("pr").description("Generate title and header strings for your PRs");

pr.command("title")
  .description("Generates a PR title and copies to clipboard")
  .argument("[title]", "title string to inject")
  .action(prTitle);

pr.command("header")
  .description("Generates a PR header and copies to clipboard")
  .action(prHeader);

let member = program.command("member").description("Add a new member or delete an existing one using their uniqueInitials");

member
  .command("add")
  .description("Add a new member to the config")
  .action(addMember);

member
  .command("del")
  .argument("<initials>", "uniqueInitials of member to delete")
  .action(delMember);

program.command("update").description("checks for updates").action(update);

let team = program.command("team").description("Create a new team from your members or delete an existing one");

team.command("new").action(newTeam);
team
  .command("del")
  .arguments("<name>", "Name of the team to delete")
  .action((name) => delTeam(name));

program.parse();
