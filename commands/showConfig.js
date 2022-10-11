import conf from "conf";
import chalk from "chalk";
import validateConfig from "../utils/validateConfig.js";
import getConfig from "../utils/getConfig.js";

export default function showConfig() {
  const config = getConfig();
  validateConfig(config);

  let { members, parentTicket, childTicket } = config;

  console.log(chalk.bold(`Members:`))
  members.forEach(member => {
    if (member.active) {
      console.log(chalk.green(`[${member.uniqueInitials}] ${member.name} <${member.email}> \u2713\n`))
    } else {
      console.log(chalk.gray(`[${member.uniqueInitials}] ${member.name} <${member.email}> \u2717\n`))
    }
  })
  console.log("\n");
  console.log(chalk.bold(`Parent Ticket:`));
  console.log(`${parentTicket}\n`);
  if (childTicket) {
    console.log(chalk.bold(`Child Ticket:`));
    console.log(`${childTicket}\n`);
  }

}
