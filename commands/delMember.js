import conf from "conf";
import chalk from "chalk";
import prompt from "prompt";
import getConfig from "../utils/getConfig.js";

const config = new conf({ projectName: "comit" });

export default async function delMember(initials) {
  let { members } = getConfig();

  
  let exists = false;

  members.forEach(member => {
    if (member.uniqueInitials === initials) {
        exists = true;
    }
  })

  if (!exists) {
    console.log(chalk.red(`No member exists with uniqueInitials ${initials}!`));
    return;
  }
    
  members = members.filter(member => member.uniqueInitials !== initials);

  config.set("members", members);
  console.log(chalk.green(`Member deleted!`));
}
