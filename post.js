const core = require('@actions/core');
const github = require('@actions/github');
const { spawn, exec  } = require('child_process');
const fs = require('fs');
const readline = require('readline');

for (const key in process.env) {
  console.log(`${key}=${process.env[key]}`);
}

const MEMORY_FILE = "/var/tmp/action-history-memory.txt"
const CPU_FILE = "/var/tmp/action-history-cpu.txt"

// exec("kill " + process.env.MEMORY_PID)
// exec("kill " + process.env.CPU_PID)

const cpuLines = fs.readFileSync(CPU_FILE, 'utf8').split("\n");
cpuLines.unshift({data: 'CPU', header: true});

const memoryLines = fs.readFileSync(MEMORY_FILE, 'utf8').split("\n");
memoryLines.unshift({data: 'Memory', header: true});

console.log("cpuLines=" + cpuLines);
console.log("memoryLines=" + memoryLines);

core.summary
  .addHeading('Resource Usage')
  .addTable([
    cpuLines,
    memoryLines
  ])
  .write()
