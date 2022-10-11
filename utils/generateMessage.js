import validateConfig from "./validateConfig.js";
import gitUserEmail from "git-user-email";
import conf from "conf";
import getConfig from "./getConfig.js";
const config = new conf();

export default function generateMessage(commitMsg) {
  const config = getConfig();
  let { members, parentTicket, childTicket } = config;

  validateConfig(config);

  let driverEmail = gitUserEmail();
  let message = `[${parentTicket}]${childTicket ? `[${childTicket}]` : ''} ${commitMsg ? `${commitMsg}` : ''}\n`;

  members = members.filter(member => (member.email !== driverEmail && member.active));
  members.forEach(member => message += `\nCo-Authored By: ${member.name} <${member.email}>`)

  return message;
}
