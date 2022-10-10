import validateConfig from "./validateConfig.js";
import gitUserEmail from "git-user-email";
import conf from "conf";
const config = new conf();

export default function generateMessage(commitMsg) {
  let members = config.get("members");
  let parentTicket = config.get("parentTicket");
  let childTicket = config.get("childTicket");

  validateConfig();

  let driverEmail = gitUserEmail();
  let message = `[${parentTicket}]${childTicket ? `[${childTicket}]` : ''} ${commitMsg ? `${commitMsg}` : ''}\n`;

  members = members.filter(member => member.email !== driverEmail);
  members.forEach(member => message += `\nCo-Authored By: ${member.name} <${member.email}>`)

  return message;
}
