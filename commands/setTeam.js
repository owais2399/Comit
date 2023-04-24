import conf from "conf";
import chalk from "chalk";
import getConfig from "../utils/getConfig.js";
import validateConfig from "../utils/validateConfig.js";
import { exit } from "process";
import set from "./set.js";
const _config = new conf({ projectName: "comit" });

export default function setTeam(name) {
  const config = getConfig();
  validateConfig(config);
  const { teams } = config;

  if (!teams) {
    console.log(
      chalk.red(
        `You don't have any teams created. Run ${chalk.italic(
          "comit team new"
        )} to create a new one.`
      )
    );
    exit(1);
  }

  let team_members = [];
  let found = false;

  for (let i = 0; i < teams.length; i++) {
    if (teams[i].name === name) {
      found = true;
      team_members = teams[i].members;
      break;
    }
  }

  if (!found) {
    console.log(chalk.red(`No such team exists!`));
    exit(1);
  }

  //   Unset all existing members
  set([], true, false, false);

  //   Set only the new team members
  set(team_members, undefined, true);
}
