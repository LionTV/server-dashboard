<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import { logicalPropertiesHorizontalSlide } from "$lib/transition";
    import { onMount } from "svelte";

    let menuOpen = false;
    const giga = 1024 * 1024 * 1024;

    let usage = {
        cpuUsage: 0,
        cpus: 0,
        cpuSpeed: 0,
        memUsage: 0.0,
        usedMemory: 0.0,
        maxMemory: 0.0
    };

    let stats = {
        hostname: "",
        platform: "",
        ipAddress: "",
        homedir: ""
    }

    let username = "Username";

    let filesystem = {
        "fs": [
            {
                "fs":"C:",
                "use": 0.0,
                "size": 0,
                "used": 0
            }
        ]
    };

    onMount(() => {
        async function getServerData() {
            let result = await fetch("/api/server");
            const data = await result.json();
            usage = data.usage;
            stats = data.stats;
            filesystem = data.filesys;
            username = data.user.username;
        }

        const interval = setInterval(getServerData, 3000);
        getServerData();

        return () => clearInterval(interval);
    });

    let unique = {}

    function restart() {
        unique = {}
    }

    let lines: Array<String> = [];
    let output: Array<String> = [];

    let inputCommand = "";

    function handleInput() {
        lines.push(inputCommand);

        if (inputCommand.startsWith("echo")) {
            output.push(inputCommand.substring(4));
        }

        restart();
        inputCommand = "";
    }

</script>

<!-- {#if menuOpen}
    <div transition:logicalPropertiesHorizontalSlide={{direction: 'inline', duration: 250}} class="h-screen w-56 bg-white z-50 absolute">

    </div>
{/if}

<div class="h-12 bg-slate-700">
    <button on:click={() => menuOpen = !menuOpen}>Open</button>
</div> -->

<div class="flex">
    <Navbar />
    <div class="bg-slate-700 w-full min-h-screen h-auto lg:h-screen lg:max-h-screen p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card title="HOST SYSTEM USAGE">
                <h2 class="text-sm mt-8 font-medium">CPU USAGE</h2>
                <div class="w-full h-2 bg-neutral-600 mt-2 rounded">
                    <div style="width: {usage.cpuUsage}%;" class="h-full bg-blue-500 rounded"></div>
                </div>
                <p class="text-sm mt-2 text-neutral-400">{usage.cpuUsage}% of {usage.cpus}x {usage.cpuSpeed} MHz</p>
                <h2 class="text-sm mt-8 font-medium">MEMORY USAGE</h2>
                <div class="w-full h-2 bg-neutral-600 mt-2 rounded">
                    <div style="width: {usage.memUsage}%;" class="h-full bg-yellow-500 rounded"></div>
                </div>
                <p class="text-sm mt-2 text-neutral-400">{usage.memUsage}% ({usage.usedMemory}/{usage.maxMemory} GB)</p>
            </Card>
            <Card title="SYSTEM INFOS">
                <p class="mt-8 text-neutral-400">Hostname: <span class="text-white">{stats.hostname}</span></p>
                <p class="mt-5 text-neutral-400">Platform: <span class="text-white">{stats.platform}</span></p>
                <p class="mt-5 text-neutral-400">Local ip-address: <span class="text-white">{stats.ipAddress}</span></p>
                <p class="mt-5 text-neutral-400">Home directory: <span class="text-white">{stats.homedir}</span></p>
            </Card>
            <Card title="FILE SYSTEM">
                {#each filesystem["fs"] as fs}
                    <h2 class="text-sm mt-2 font-medium">{fs.fs}\</h2>
                    <div class="w-full h-2 bg-neutral-600 mt-2 rounded">
                        <div style="width: {fs.use}%;" class="h-full bg-yellow-500 rounded"></div>
                    </div>
                    <p class="text-sm mt-2 text-neutral-400">{fs.use}% ({(fs.used / giga).toFixed(2)}/{(fs.size / giga).toFixed(2)} GB)</p>
                {/each}
            </Card>
            <div class="w-full h-96 inverse-toggle p-8 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-slate-800 rounded-lg leading-normal overflow-hidden">
                <div class="leading-normal overflow-hidden h-[97%]">
                    {#key unique}
                        {#each lines as line}
                            <div class="mt-2 flex">
                                <span class="text-green-400">{username}~$</span>
                                <p class="text-sm ml-2">{line}</p>
                            </div>
                        {/each}
                        {#each output as out}
                            <p class="mt-2">{out}</p>
                        {/each}
                    {/key}
                    <div class="mt-2 flex">
                        <span class="text-green-400">{username}~$</span>
                        <form on:submit|preventDefault={handleInput} class="w-[80%] h-auto">
                            <!-- svelte-ignore a11y-autofocus -->
                            <input bind:value={inputCommand} type="text" class="bg-transparent text-white w-full h-auto outline-none text-sm ml-2" on:submit={handleInput} autofocus>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>