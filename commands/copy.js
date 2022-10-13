import { exec } from "child_process";
import { exit } from "process";
import conf from "conf";
import chalk from "chalk";
import clipboard from "clipboardy";
import generateMessage from "../utils/generateMessage.js";

export default function copy(commitMsg, stage, commit, push, x) {
  if (stage || commit || push || x) {
    if (stage) exec_stage();
    if (commit) exec_commit(commitMsg);
    if (push) exec_push();
    if (x) {
      exec_stage();
      exec_commit(commitMsg);
      exec_push();
    }
  } else {
    clipboard.writeSync(generateMessage(commitMsg));
    console.log(chalk.green(`Message copied to clipboard!`));
  }
}

const exec_stage = () => {
  exec("git add .", (error, _stdout, _stderr) => {
    if (error) {
      console.error(_stderr);
      exit(1);
    }
    console.log(_stdout);
  });
};

const exec_commit = (commitMsg) => {
  exec(
    `git commit -m "${generateMessage(commitMsg)}"`,
    (error, _stdout, _stderr) => {
      if (error) {
        console.error(_stderr);
        exit(1);
      }
      console.log(_stdout);
    }
  );
};

const exec_push = () => {
  exec("git push", (error, _stdout, _stderr) => {
    if (error) {
      console.error(_stderr);
      exit(1);
    }
    console.log(_stdout);
  });
};
