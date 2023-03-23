import * as core from '@actions/core';
import * as path from 'path';
import {exec, spawn, SpawnOptionsWithoutStdio} from 'child_process';
import * as fs from 'fs';

const intervalSeconds: number = parseInt(core.getInput("interval_seconds"), 10)
console.log("intervalSeconds=" + intervalSeconds)

const MEMORY_FILE = "/var/tmp/action-history-memory.txt";
const CPU_FILE = "/var/tmp/action-history-cpu.txt";

console.log("===================1");
fs.writeFileSync(MEMORY_FILE, 'nan\n');
fs.writeFileSync(CPU_FILE, 'nan\n');

console.log("===================2");
process.env.RUNNER_TRACKING_ID = "0"
const options: SpawnOptionsWithoutStdio = {
    // detached: true,
    // stdio: [null, null, null],
    env: {
        ...process.env,
        RUNNER_TRACKING_ID: "0"
    }
};

exec(
    `sh -c RUNNER_TRACKING_ID=0 nohup ${path.join(__dirname, 'cpu.sh')} --CPU_FILE=${CPU_FILE} --INTERVAL_SECONDS=${intervalSeconds} &`);

const cpuProcess = spawn(
    'sh', ['-c', `RUNNER_TRACKING_ID=0 nohup ${path.join(__dirname, 'cpu.sh')} --CPU_FILE=${CPU_FILE} --INTERVAL_SECONDS=${intervalSeconds} &`], options);
const memoryProcess = spawn(
    'sh', ['-c', `RUNNER_TRACKING_ID=0 nohup ${path.join(__dirname, 'memory.sh')} &`], options);

exec("sleep 10")

console.log(`CPU_FILE=${fs.readFileSync(CPU_FILE, 'utf8')}`)
// cpuProcess.unref()
// memoryProcess.unref()
console.log("===================3");
