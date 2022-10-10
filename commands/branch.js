import chalk from "chalk";
import clipboard from "clipboardy";
import getConfig from "../utils/getConfig.js";

export default function branch(desc) {
  let { parentTicket, childTicket } = getConfig();

  parentTicket = parentTicket.replaceAll("-", "_");
  let _desc = desc.replaceAll(" ", "-");
  let branchName = "";

  if (childTicket) {
    childTicket = childTicket.replaceAll("-", "_");
    branchName = `${parentTicket}-${childTicket}_${_desc}`;
  } else {
    branchName = `${parentTicket}_${_desc}`;
  }
  clipboard.writeSync(branchName);
  console.log(chalk.green(`Branch name copied to clipboard!`));
}
