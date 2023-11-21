import { json } from "@sveltejs/kit";
import os from 'node:os';
import si, { fsSize } from 'systeminformation';

const giga = 1024 * 1024 * 1024;

export async function GET() {
    const cpuLoads = await si.currentLoad();
    const osInfo = await si.osInfo();
    const filesys = await si.fsSize();
    return json({
        usage: {
            cpus: os.cpus().length,
            cpuName: os.cpus()[0].model,
            cpuSpeed: os.cpus()[0].speed,
            cpuUsage: Math.round(cpuLoads.currentLoad),
            maxMemory: (os.totalmem() / giga).toFixed(2),
            usedMemory: ((os.totalmem() - os.freemem()) / giga).toFixed(2),
            memUsage: Math.round((((os.totalmem() - os.freemem()) / giga) / (os.totalmem() / giga)) * 100),
        },
        stats: {
            hostname: os.hostname(),
            platform: osInfo.platform,
            //@ts-ignore
            ipAddress: os.networkInterfaces()["Ethernet"][0].address,
            homedir: os.homedir()
        },
        filesys: {
            fs: filesys,
        },
        user: {
            username: os.userInfo().username
        }
    });
}