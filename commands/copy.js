import { exec } from "child_process"
import { exit } from "process";
import conf from "conf";
import chalk from "chalk";
import clipboard from "clipboardy";
import generateMessage from "../utils/generateMessage.js";

const config = new conf();

export default function copy(commitMsg, commit) {
  if (commit) {
    exec(`git commit -m "${generateMessage(commitMsg)}"`, (error, _stdout, _stderr) => {
      if (error) {
        console.error(_stderr);
        exit(1);
      }
      console.log(_stdout);
    })
  } else {
    clipboard.writeSync(generateMessage(commitMsg))
    console.log(chalk.green(`Message copied to clipboard!`));
  }
}
