import conf from "conf";
import showConfig from "./showConfig.js";
const config = new conf({ projectName: "comit" });

export default function setTicket(ticket, type) {
  config.set(type, ticket);
  showConfig();
}
