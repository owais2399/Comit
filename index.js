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

program
  .command("set")
  .description("Sets members active")
  .argument("[uniqueInitials...]", "Space-separated unique initials of members")
  .action((uniqueInitials) => set(uniqueInitials, true));

program
  .command("unset")
  .description("Sets members inactive")
  .argument("[uniqueInitials...]", "Space-separated unique initials of members")
  .action((uniqueInitials) => set(uniqueInitials, false));

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

let pr = program.command("pr");

pr.command("title")
  .description("Generates a PR title and copies to clipboard")
  .argument("[title]", "title string to inject")
  .action(prTitle);

pr.command("header")
.description("Generates a PR header and copies to clipboard")
.action(prHeader);

program.parse();
