import chalk from "chalk";
import clipboard from "clipboardy";
import getConfig from "../utils/getConfig.js";

export default function prHeader() {
    const { parentTicket, childTicket } = getConfig();
    // clipboard.writeSync(`[${parentTicket}]${childTicket ? `[${childTicket}]` : ''} ${title ? title : ''}`)
    console.log(chalk.red("Not implemented."));
}