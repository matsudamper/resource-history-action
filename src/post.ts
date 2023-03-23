import * as core from "@actions/core";
import * as fs from 'fs';

for (const key in process.env) {
    console.log(`${key}=${process.env[key]}`);
}

const MEMORY_FILE = "/var/tmp/action-history-memory.txt";
const CPU_FILE = "/var/tmp/action-history-cpu.txt";

// exec("kill " + process.env.MEMORY_PID);
// exec("kill " + process.env.CPU_PID);

const cpuLines: any[] = fs.readFileSync(CPU_FILE, 'utf8').split("\n");
cpuLines.unshift({data: 'CPU', header: true});

const memoryLines: any[] = fs.readFileSync(MEMORY_FILE, 'utf8').split("\n");
memoryLines.unshift({data: 'Memory', header: true});

console.log("cpuLines=" + JSON.stringify(cpuLines));
console.log("memoryLines=" + JSON.stringify(memoryLines));

(async () =>
        await core.summary
            .addHeading('Resource Usage')
            .addTable([
                cpuLines,
                memoryLines
            ])
            .write()
)()
