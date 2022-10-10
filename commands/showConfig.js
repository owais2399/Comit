import conf from "conf";
import chalk from "chalk";
import validateConfig from "../utils/validateConfig.js";
const config = new conf();

export default function showConfig() {
  let members = config.get("members");
  let parentTicket = config.get("parentTicket");
  let childTicket = config.get("childTicket");

  validateConfig();

  console.log(chalk.bold(`Members:`))
  members.forEach(member => {
    if (member.active) {
      console.log(chalk.green(`${member.uniqueInitials} ${member.name} <${member.email}> \u2713\n`))
    } else {
      console.log(chalk.gray(`${member.uniqueInitials} ${member.name} <${member.email}> \u2717\n`))
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
