import conf from "conf";
import chalk from "chalk";
const config = new conf({ projectName: "comit" });

export default function delChildTicket() {
  config.delete("childTicket");
  console.log(chalk.green("Deleted child ticket!"));
}
