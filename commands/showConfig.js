import conf from "conf";
import chalk from "chalk";
import validateConfig from "../utils/validateConfig.js";
const config = new conf();

export default function showConfig() {
  let members = config.get("members");
  let parentTicket = config.get("parentTicket");
  let childTicket = config.get("childTicket");

  validateConfig();

  console.log(chalk.green(`Members:`))
  members.forEach(member => console.log(`${member.uniqueInitials} ${member.name} <${member.email}>`));
  console.log("\n");
  console.log(chalk.green(`Parent Ticket:`));
  console.log(`${parentTicket}\n`);
  if (childTicket) {
    console.log(chalk.green(`Child Ticket:`));
    console.log(`${childTicket}\n`);
  }

}
