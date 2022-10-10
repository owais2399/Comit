import conf from "conf";
import chalk from "chalk";
import prompt from "prompt";
const config = new conf();

export default async function init() {
  prompt.message = "";
  prompt.delimiter = "";

  const { parentTicket, childTicket } = await prompt.get([
    {
      name: "parentTicket",
      type: "string",
      required: true,
    },
    {
      name: "childTicket",
      type: "string",
      required: false,
    },
  ]);

  console.log(chalk.green(`\nEnter members. Once you're done, just input '0' as the name to stop.`))
  let members = []
  while(true) {
    console.log(chalk.green(`\nMember ${members.length + 1}`))
    
    const { name } = await prompt.get(['name']);
    
    if (name === "0") break;
    
    const { email } = await prompt.get(['email']);
    const { uniqueInitials } = await prompt.get(['uniqueInitials']);

    members.push({uniqueInitials, name, email});
  }

  console.log(chalk.green(`All set. Here's your config:\n`));
  console.log(chalk.yellow(`${parentTicket} ${childTicket}\n`));
  members.forEach(member => console.log(chalk.yellow(`${member.uniqueInitials} ${member.name} <${member.email}>\n`)))

  config.set("members", members)
  config.set("parentTicket", parentTicket)
  config.set("childTicket", childTicket)
}
