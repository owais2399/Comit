import clipboard from "clipboardy";
import getConfig from "../utils/getConfig.js";
import chalk from "chalk";

export default function prTitle(title) {
    const { parentTicket, childTicket } = getConfig();
    clipboard.writeSync(`[${parentTicket}]${childTicket ? `[${childTicket}]` : ''} ${title ? title : ''}`);
    console.log(chalk.green("Copied to clipboard!"));
}