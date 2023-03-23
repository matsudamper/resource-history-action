import * as core from '@actions/core';
import * as path from 'path';
import {exec, spawn, SpawnOptionsWithoutStdio} from 'child_process';
import * as fs from 'fs';

const intervalSeconds: number = parseInt(core.getInput("interval_seconds"), 10)
console.log("intervalSeconds=" + intervalSeconds)

const MEMORY_FILE = "/var/tmp/action-history-memory.txt";
const CPU_FILE = "/var/tmp/action-history-cpu.txt";

console.log("===================1");
fs.writeFileSync(MEMORY_FILE, '');
fs.writeFileSync(CPU_FILE, '');

console.log("===================2");
process.env.RUNNER_TRACKING_ID = "0"
const options: SpawnOptionsWithoutStdio = {
    detached: true,
    stdio: [null],
    env: {
        ...process.env,
        RUNNER_TRACKING_ID: "0"
    }
};

const cpuProcess = spawn(
    'sh', ['-c', `RUNNER_TRACKING_ID=0 nohup ${path.join(__dirname, 'cpu.sh')} &`], options);
const memoryProcess = spawn(
    'sh', ['-c', `RUNNER_TRACKING_ID=0 nohup ${path.join(__dirname, 'memory.sh')} &`], options);

cpuProcess.unref()
memoryProcess.unref()
console.log("===================3");
