import chalk from "chalk";
import clipboard from "clipboardy";
import getConfig from "../utils/getConfig.js";

export default function prHeader() {
    const { parentTicket, childTicket } = getConfig();
    const childString = `/[${childTicket}](https://sadapay.atlassian.net/browse/${childTicket})`
    clipboard.writeSync(`[${parentTicket}](https://sadapay.atlassian.net/browse/${parentTicket})${childTicket ? childString : ''}`)
    console.log(chalk.green("Copied to clipboard!"));
}