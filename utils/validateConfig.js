import getConfig from "./getConfig.js";
import chalk from "chalk";
import conf from "conf";
import { exit } from "process";
const config = new conf();

export default function validateConfig({ members, parentTicket }) {

  if (!members || !parentTicket) {
    console.log(
      chalk.red(
        `Config has not been set or is invalid. Run "comit init" to setup config.`
      )
    );
    exit(1);
  }
}
