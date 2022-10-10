import conf from "conf";
import chalk from "chalk";
const config = new conf();

export default function reset() {
  config.clear();
  console.log(chalk.green(`Config Reset!`));
}
