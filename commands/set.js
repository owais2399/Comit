import conf from "conf";
import chalk from "chalk";
import getConfig from "../utils/getConfig.js";
import validateConfig from "../utils/validateConfig.js";
import { exit } from "process";
import showConfig from "./showConfig.js";
const _config = new conf({ projectName: "comit" });

export default function set(uniqueInitials, all, value, shouldShowConfig=true) {
  const config = getConfig();
  validateConfig(config);

  let members = config.members;

  if (all) {
    for (let i = 0; i < members.length; i++) {
      members[i].active = value;
    }
  } else {
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
  }

  _config.set("members", members);

  if (shouldShowConfig) {
    showConfig();
  }
}
