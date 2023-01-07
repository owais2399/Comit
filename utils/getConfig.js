import conf from "conf";
const config = new conf({ projectName: "comit" });

export default function getConfig() {
  let members = config.get("members");
  let parentTicket = config.get("parentTicket");
  let childTicket = config.get("childTicket");
  let lastUpdateCheckedAt = config.get("lastUpdateCheckedAt");
  let teams = config.get("teams");

  if (childTicket) return {members, parentTicket, childTicket, lastUpdateCheckedAt, teams}
  return {members, parentTicket, lastUpdateCheckedAt, teams}
}
