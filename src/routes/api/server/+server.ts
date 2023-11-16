import { json } from "@sveltejs/kit";
import os from 'node:os';
import si, { fsSize } from 'systeminformation';

const giga = 1024 * 1024 * 1024;

si.system().then((res) => {
    console.log(res);
});

export async function GET() {
    const loads = await si.currentLoad();
    return json({
        usage: {
            cpus: os.cpus().length,
            cpuName: os.cpus()[0].model,
            cpuSpeed: os.cpus()[0].speed,
            cpuUsage: Math.round(loads.currentLoad),
            maxMemory: (os.totalmem() / giga).toFixed(2),
            usedMemory: ((os.totalmem() - os.freemem()) / giga).toFixed(2),
            memUsage: Math.round((((os.totalmem() - os.freemem()) / giga) / (os.totalmem() / giga)) * 100),
        },
    });
}