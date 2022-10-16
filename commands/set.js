import conf from "conf";
import chalk from "chalk";
import getConfig from "../utils/getConfig.js";
import validateConfig from "../utils/validateConfig.js";
import { exit } from "process";
const _config = new conf({ projectName: "comit" });

export default function set(uniqueInitials, value) {
  const config = getConfig();
  validateConfig(config);

  let members = config.members;

  uniqueInitials.forEach(initials => {
    const index = members.findIndex(
      (member) => member.uniqueInitials === initials
    );
  
    if (index == -1) {
      console.log(
        chalk.red(`No member exists with uniqueInitials ${initials}!`)
      );
      exit(1);
    }
    members[index].active = value;
  })

  _config.set("members", members);
}
