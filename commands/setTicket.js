import chalk from "chalk";
import conf from "conf";
const config = new conf();

export default function setTicket(ticket, type) {
  config.set(type, ticket);
}
