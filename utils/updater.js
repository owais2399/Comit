import getConfig from "./getConfig.js";
import chalk from "chalk";
import conf from "conf";
import { exit } from "process";
import update from "../commands/update.js";

const config = new conf({ projectName: "comit" });

export default async function checkUpdatesIfApplicable() {
    const { lastUpdateCheckedAt } = getConfig();
    const CHECK_UPDATE_THRESHOLD = 172800000; // 48 hours

    const now = Date.now();

    if(!lastUpdateCheckedAt) {
        await update();
        config.set("lastUpdateCheckedAt", now);
    }

    if(lastUpdateCheckedAt && (now - lastUpdateCheckedAt > CHECK_UPDATE_THRESHOLD)) {
        await update();
        config.set("lastUpdateCheckedAt", now);
    }
}
