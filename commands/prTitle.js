import clipboard from "clipboardy";
import getConfig from "../utils/getConfig.js";

export default function prTitle(title) {
    const { parentTicket, childTicket } = getConfig();
    clipboard.writeSync(`[${parentTicket}]${childTicket ? `[${childTicket}]` : ''} ${title ? title : ''}`)
}