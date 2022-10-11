import conf from "conf";
const config = new conf({ projectName: "comit" });

export default function getConfig() {
  let members = config.get("members");
  let parentTicket = config.get("parentTicket");
  let childTicket = config.get("childTicket");

  if (childTicket) return {members, parentTicket, childTicket}
  return {members, parentTicket}
}
