import conf from "conf";
import chalk from "chalk";
import getConfig from "../utils/getConfig.js";
import validateConfig from "../utils/validateConfig.js";
import { exit } from "process";
const _config = new conf();

export default function set(uniqueInitials, value) {
  const config = getConfig();
  validateConfig(config);

  let members = config.members;

  const index = members.findIndex(
    (member) => member.uniqueInitials === uniqueInitials
  );

  if (index == -1) {
    console.log(
      chalk.red(`No member exists with uniqueInitials ${uniqueInitials}!`)
    );
    exit(1);
  }

  members[index].active = value;
  _config.set("members", members);
}
