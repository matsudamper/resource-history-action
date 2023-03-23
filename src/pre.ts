import * as path from 'path';
import { spawn } from 'child_process';
import * as fs from 'fs';

const MEMORY_FILE = "/var/tmp/action-history-memory.txt";
const CPU_FILE = "/var/tmp/action-history-cpu.txt";

console.log("===================1");
fs.writeFileSync(MEMORY_FILE, '');
fs.writeFileSync(CPU_FILE, '');

console.log("===================2");
const options = {
    detached: true,
    stdio: ['ignore'],
};

const cpuProcess = spawn(
    "nohup", [path.join(__dirname, 'scripts', 'cpu.sh', '&')], {
        env: Object.assign(process.env, {
            RUNNER_TRACKING_ID: ""
        })
    });
const memoryProcess = spawn(
    "nohup", [path.join(__dirname, 'scripts', 'memory.sh', '&')], {
        env: Object.assign(process.env, {
            RUNNER_TRACKING_ID: ""
        })
    });

console.log("===================3");
