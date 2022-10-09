import { exec, spawnSync } from "child_process";
import { readFile, writeFile } from 'fs/promises';
import { exit } from "process";
import gitUserEmail from "git-user-email"
import clipboard from "clipboardy"

let CONFIG_PATH = './config.json'

let config = JSON.parse(
  await readFile(
    new URL(CONFIG_PATH, import.meta.url)
  )
);


let driverEmail;
try {
    driverEmail = gitUserEmail();
    config.members = config.members.filter(member => member.email !== driverEmail)
} catch (error) {
    exit(1)
}

let args = process.argv.slice(2);

let message = `[${config.parentIssue}]`

if (config.childIssue) {
    message += `[${config.childIssue}] `
}

switch (args[0]) {
    case "--init":
        let parentIssue = args[1]
        let childIssue = args[2] ? args[2] : ''
        
        if (!parentIssue) {
            console.error("Missing argument parentIssue")
            exit(1)
        }
        config.parentIssue = parentIssue;
        
        if (childIssue === '') {
            delete config.childIssue
        } else {
            config.childIssue = childIssue
        }

        let newConfig = JSON.stringify(config, null, 2);
        await writeFile(CONFIG_PATH, newConfig);
        console.log(`Updated config\nparentIssue: ${parentIssue}\nchildIssue: ${childIssue}`)
        break;
    
    
    case undefined:
        message += ' \n'
        config.members.forEach(member => message += `\nCo-Authored By: ${member.name} <${member.email}>`)
        clipboard.writeSync(message);
        break;
    
    
    
    default:
        message += args[0]
        message += ' \n'
        config.members.forEach(member => message += `\nCo-Authored By: ${member.name} <${member.email}>`)
        console.log(`Commiting with message:\n${message}`);
        exec(`git commit -m "${message}"`, (error, outstr, errstr) => {
            
            console.log('\n--------------------------------------------\n')
            if (error) {
                console.error(errstr)
            } else {
                console.log(outstr)
            }
        })
        break;
}