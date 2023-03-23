import * as path from 'path';
import {spawn, SpawnOptionsWithoutStdio, StdioPipe} from 'child_process';
import * as fs from 'fs';

const MEMORY_FILE = "/var/tmp/action-history-memory.txt";
const CPU_FILE = "/var/tmp/action-history-cpu.txt";

console.log("===================1");
fs.writeFileSync(MEMORY_FILE, '');
fs.writeFileSync(CPU_FILE, '');

console.log("===================2");

const options: SpawnOptionsWithoutStdio = {
    detached: true,
    stdio: [null],
    env: {
        ...process.env,
        RUNNER_TRACKING_ID: ""
    }
};

const cpuProcess = spawn(
    path.join(__dirname, 'scripts', 'cpu.sh'), options);
const memoryProcess = spawn(
    path.join(__dirname, 'scripts', 'memory.sh'), options);

// cpuProcess.unref()
// memoryProcess.unref()
console.log("===================3");
