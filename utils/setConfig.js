import conf from "conf";
const config = new conf({ projectName: "comit" });

export default function setTeam(name, team_members) {
  let teams = config.get("teams");
  if (!teams) {
    config.set("teams", []);
  }
  teams = config.get("teams");

  let updated = false;

  for (let i = 0; i < teams.length; i++) {
    if(teams[i].name === name) {
        // Override existing team
        teams[i].members = team_members;
        updated = true;
        break;
    }
  }

  if(!updated) {
    // Create new team
    teams.push({name, members: team_members});
  }

  config.set("teams", teams);
}
