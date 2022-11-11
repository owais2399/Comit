import axios from "axios";
import chalk from "chalk";
import clipboard from "clipboardy";
import jsonfile from "jsonfile";

export default function update() {
  console.log(chalk.gray(`Checking for updates...`));
  axios.get("https://registry.npmjs.org/comit/").then((res) => {
    const localVersion = jsonfile.readFileSync("./package.json").version;
    const remoteVersion = res.data["dist-tags"].latest;
    
    if (localVersion !== remoteVersion) {
        clipboard.writeSync("sudo npm i -g comit");
        console.log(chalk.yellow(`There's a new version available. Update comit by running ${chalk.italic("sudo npm i -g comit")}, which has been copied to your clipboard.`));
    } else {
        console.log(chalk.green(`Comit is up to date!`));
    }
  });
}
