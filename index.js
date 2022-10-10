#! /usr/bin/env node
import { program } from "commander";

import copy from "./commands/copy.js";
import init from "./commands/init.js";
import showConfig from "./commands/showConfig.js";
import reset from "./commands/reset.js";

program
  .description("Copy commit message to clipboard")
  .argument("[commit-msg]", "commit message")
  .option("-c", "commits to git instead of copying to clipboard")
  .action((commitMsg) => copy(commitMsg, program.opts()["c"]));

program
  .command("init")
  .description("Starts the config initialization wizard")
  .action(init);

program
  .command("show-config")
  .description("Displays the current config, if set")
  .action(showConfig);

program.command("reset").description("Resets the set config").action(reset);


program.parse();