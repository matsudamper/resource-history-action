const path = require('path');
const { spawn, exec } = require('child_process');
const fs = require('fs');

const MEMORY_FILE = "/var/tmp/action-history-memory.txt"
const CPU_FILE = "/var/tmp/action-history-cpu.txt"

console.log("===================1")
fs.writeFileSync(MEMORY_FILE, '')
fs.writeFileSync(CPU_FILE, '')

console.log("===================2")
const options = {
    detached: true,
    stdio: ['ignore'],
};

// const cpuProcess = spawn(path.join(__dirname, 'scripts', 'cpu.sh'), options);
// const memoryProcess = spawn(path.join(__dirname, 'scripts', 'memory.sh'), options);
const cpuProcess = exec(
    "nohup", [path.join(__dirname, 'scripts', 'cpu.sh', '&')], {
    env: Object.assign(process.env, {
        RUNNER_TRACKING_ID: ""
    })
});
const cpuProcess = exec(
    "nohup", [path.join(__dirname, 'scripts', 'memory.sh', '&')], {
    env: Object.assign(process.env, {
        RUNNER_TRACKING_ID: ""
    })
});

console.log("===================3")
// fs.appendFileSync(process.env.GITHUB_ENV, 'MEMORY_PID=' + memoryProcess.pid + "\n")
// fs.appendFileSync(process.env.GITHUB_ENV, 'CPU_PID=' + cpuProcess.pid + "\n")


console.log("===================4")
cpuProcess.unref();
memoryProcess.unref();
console.log("===================5")
