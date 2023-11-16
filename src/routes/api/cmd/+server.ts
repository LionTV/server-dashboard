import { json } from "@sveltejs/kit";
import { exec } from "child_process";

export function GET() {
    let output = "";
    exec('dir', (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        output = stdout;
    }); 

    return new Response(output);
}