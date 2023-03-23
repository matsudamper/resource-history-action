const { spawn } = require('child_process');
const fs = require('fs');

const MEMORY_FILE = "/var/tmp/action-history-memory.txt"
const CPU_FILE = "/var/tmp/action-history-cpu.txt"

fs.writeFileSync(MEMORY_FILE, '')
fs.writeFileSync(CPU_FILE, '')

const options = {
    detached: true,
    stdio: ['ignore'],
};


const cpuProcess = spawn('scripts/cpu.sh', options);
const memoryProcess = spawn('scripts/memory.sh', options);

fs.appendFileSync(process.env.GITHUB_ENV, 'MEMORY_PID=' + memoryProcess.pid + "\n")
fs.appendFileSync(process.env.GITHUB_ENV, 'CPU_PID=' + cpuProcess.pid + "\n")

cpuProcess.unref();
memoryProcess.unref();
