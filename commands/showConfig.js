import conf from "conf";
import chalk from "chalk";
import validateConfig from "../utils/validateConfig.js";
import getConfig from "../utils/getConfig.js";

export default function showConfig() {
  const config = getConfig();
  validateConfig(config);

  let { members, parentTicket, childTicket, teams } = config;

  console.log(chalk.bold(chalk.underline(`Members:\n`)));
  members.forEach((member) => {
    if (member.active) {
      console.log(
        chalk.green(
          `[${member.uniqueInitials}] ${member.name} <${member.email}> \u2713\n`
        )
      );
    } else {
      console.log(
        chalk.gray(
          `[${member.uniqueInitials}] ${member.name} <${member.email}> \u2717\n`
        )
      );
    }
  });

  if(teams) {
    console.log(chalk.bold(chalk.underline(`\n\nTeams:\n`)));
    teams.forEach((team) => {
      console.log(`Name: ${team.name}\t\tMembers: ${team.members.join(", ")}\n`);
    });
  }

  console.log(`${chalk.bold("\n\nParent Ticket:")}\t\t${parentTicket}\n`);
  if (childTicket) {
    console.log(`${chalk.bold("Child Ticket:")}\t\t${childTicket}`);
  }
}
