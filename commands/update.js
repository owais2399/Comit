import axios from "axios";
import chalk from "chalk";
import clipboard from "clipboardy";
import jsonfile from "jsonfile";

export default async function update() {
  console.log(chalk.gray(`Checking for updates...`));
  const res = await axios.get("https://registry.npmjs.org/comit/");
  const localVersion = jsonfile.readFileSync("./package.json").version.trim();
  const remoteVersion = res.data["dist-tags"].latest.trim();

  if (localVersion !== remoteVersion) {
    console.log(chalk.gray(`Local version: ${localVersion}\nRemote version: ${remoteVersion}`));
    console.log(
      chalk.yellow(
        `There's a new version available. Update comit by running ${chalk.italic(
          "sudo npm i -g comit"
        )}`
      )
    );
  } else {
    console.log(chalk.green(`Comit is up to date!`));
  }
}
