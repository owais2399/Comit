import conf from "conf";
import chalk from "chalk";
import prompt from "prompt";
import getConfig from "../utils/getConfig.js";
import setTeam from "../utils/setConfig.js";

const config = new conf({ projectName: "comit" });

export default async function newTeam() {
  // Display Roster
  let { members } = getConfig();

  console.log("Members Roster:\n");

  members.forEach((member) => {
    console.log(
      `[${member.uniqueInitials}] ${member.name} <${member.email}>\n`
    );
  });

  //   Get new members
  console.log(
    chalk.green(
      `\nEnter the uniqueInitials for each member that you want in this team. Once you're done, just input '0' to stop.`
    )
  );
  let team_members = [];
  while (true) {
    console.log(chalk.green(`\nMember ${team_members.length + 1}`));

    const { uniqueInitials } = await prompt.get(["uniqueInitials"]);

    if (uniqueInitials === "0") break;

    let unique = true;

    for (let i = 0; i < team_members.length; i++) {
      if (team_members[i] === uniqueInitials) {
        unique = false;
      }
    }

    if (unique) {
      if (isValidMember(uniqueInitials, members)) {
        team_members.push(uniqueInitials);
      } else {
        console.log(
          chalk.red(
            `The uniqueInitials you entered do not match with any member from the roster! This member will be ignored.`
          )
        );
      }
    } else {
      console.log(
        chalk.red(
          `The uniqueInitials you entered were already in this team! This member will be ignored.`
        )
      );
    }
  }

  console.log("What do you want to call this new team?\n");
  console.log(
    chalk.gray(
      chalk.italic(
        `Team names are case sensitive and without spaces.\n
        If you use a name that is already in use, that team will get overridden.\n`
      )
    )
  );

  let name;
  while (true) {
    const { teamName } = await prompt.get(["teamName"]);
    if (teamName.includes(" ")) {
      console.log(
        chalk.red(`Spaces are not allowed. Use underscores instead.\n`)
      );
    } else {
      name = teamName;
      break;
    }
  }

  //   Persist new team
  setTeam(name, team_members);
}

const isValidMember = (uniqueInitials, members) => {
  let exists = false;

  for (let i = 0; i < members.length; i++) {
    if (members[i].uniqueInitials === uniqueInitials) {
      exists = true;
    }
  }
  return exists;
};
