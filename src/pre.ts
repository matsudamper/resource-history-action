import * as core from '@actions/core';
import * as path from 'path';
import {spawn, SpawnOptionsWithoutStdio} from 'child_process';
import * as fs from 'fs';

const intervalSeconds: number = parseInt(core.getInput("interval_seconds"), 10)
console.log("intervalSeconds=" + intervalSeconds)

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

console.log("process.env.GITHUB_WORKSPACE=" + process.env.GITHUB_WORKSPACE)

const workspace = process.env.GITHUB_WORKSPACE as string
const actionRef = process.env.GITHUB_ACTION_REF as string
const actionRoot = workspace + "/" + actionRef
console.log("actionRoot" + actionRoot)

const cpuProcess = spawn(
    path.join(actionRoot, 'scripts', 'cpu.sh'), options);
const memoryProcess = spawn(
    path.join(actionRoot, 'scripts', 'memory.sh'), options);

cpuProcess.unref()
memoryProcess.unref()
console.log("===================3");
