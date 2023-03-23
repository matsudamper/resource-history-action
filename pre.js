const { spawn } = require('child_process');
const fs = require('fs');

for (const key in process.env) {
    console.log(`${key}=${process.env[key]}`);
}

fs.writeFileSync(process.env.MEMORY_FILE, '')
fs.writeFileSync(process.env.CPU_FILE, '')

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
