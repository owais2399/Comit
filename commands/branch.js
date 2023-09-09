import chalk from "chalk";
import clipboard from "clipboardy";
import getConfig from "../utils/getConfig.js";
import { exec } from "child_process";
import { exit } from "process";

export default function branch(desc, shouldCreateBranch) {
  let { parentTicket, childTicket } = getConfig();

  parentTicket = parentTicket.replaceAll("-", "_");
  let _desc = desc.replaceAll(" ", "-");
  let branchName = "";

  if (childTicket) {
    childTicket = childTicket.replaceAll("-", "_");
    branchName = `${parentTicket}-${childTicket}_${_desc}`;
  } else {
    branchName = `${parentTicket}_${_desc}`;
  }

  if(shouldCreateBranch) {
    exec(`git checkout -b ${branchName}`, (error, _stdout, _stderr) => {
      if (error) {
        console.error(_stderr);
        exit(1);
      }
      console.log(_stdout);
    });
  } else {
    clipboard.writeSync(branchName);
    console.log(chalk.green(`Branch name copied to clipboard!`));
  }
}
