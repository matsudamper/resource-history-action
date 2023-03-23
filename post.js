const core = require('@actions/core');
const github = require('@actions/github');
const { spawn, exec  } = require('child_process');
const fs = require('fs');
const readline = require('readline');

exec("kill " + process.env.MEMORY_PID)
exec("kill " + process.env.CPU_PID)

const cpuLines = fs.readFileSync(process.env.CPU_FILE, 'utf8').split("\n");
cpuLines.unshift({data: 'CPU', header: true});

const memoryLines = fs.readFileSync(process.env.MEMORY_FILE, 'utf8').split("\n");
memoryLines.unshift({data: 'Memory', header: true});

await core.summary
  .addHeading('Resource Usage')
  .addTable([
    cpuLines,
    memoryLines
  ])
  .write()