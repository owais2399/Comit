import conf from "conf";
import chalk from "chalk";
import prompt from "prompt";
import getConfig from "../utils/getConfig.js";

const config = new conf({ projectName: "comit" });

export default async function addMember() {
  let { members } = getConfig();

  prompt.message = "";
  prompt.delimiter = "";
    
  const { name } = await prompt.get(['name']);
  const { email } = await prompt.get(['email']);
  const { uniqueInitials } = await prompt.get(['uniqueInitials']);

  for (let i = 0; i < members.length; i++) {
    if (members[i].email === email) {
        console.log(chalk.red(`This email is already in use by another member!`))
        return;
    }
    if (members[i].uniqueInitials === uniqueInitials) {
        console.log(chalk.red(`These initials are already in use by another member!`))
        return;
    }
  }
  
  members.push({uniqueInitials, name, email, active: true});
  config.set("members", members);

  console.log(chalk.green(`Member added!`));
}
