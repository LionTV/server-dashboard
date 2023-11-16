<script>
    import Card from "$lib/components/Card.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import { onMount } from "svelte";

    let memUsage = 0;
    let maxMemory = 0.0;
    let usedMemory = 0.0;
    let cpus = 0;
    let cpuSpeed = 0;
    let cpuUsage = 0;

    onMount(() => {
        async function getServerData() {
            let result = await fetch("/api/server");
            const data = await result.json();
            maxMemory = data.usage.maxMemory;
            usedMemory = data.usage.usedMemory;
            memUsage = data.usage.memUsage;
            cpus = data.usage.cpus;
            cpuSpeed = data.usage.cpuSpeed;
            cpuUsage = data.usage.cpuUsage;
        }
        
        const interval = setInterval(getServerData, 3000);
        getServerData();

        return () => clearInterval(interval);
    });

</script>

<div class="flex">
    <Navbar />
    <div class="bg-slate-700 w-full h-auto lg:h-screen p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card title="HOST SYSTEM USAGE">
                <h2 class="text-sm mt-8 font-medium">CPU USAGE</h2>
                <div class="w-full h-2 bg-neutral-600 mt-2 rounded">
                    <div style="width: {cpuUsage}%;" class="h-full bg-blue-500 rounded"></div>
                </div>
                <p class="text-sm mt-2 text-neutral-400">{cpuUsage}% of {cpus}x {cpuSpeed} MHz</p>
                <h2 class="text-sm mt-8 font-medium">MEMORY USAGE</h2>
                <div class="w-full h-2 bg-neutral-600 mt-2 rounded">
                    <div style="width: {memUsage}%;" class="h-full bg-yellow-500 rounded"></div>
                </div>
                <p class="text-sm mt-2 text-neutral-400">{memUsage}% ({usedMemory}/{maxMemory} GB)</p>
                
            </Card>
            <Card>
                Moin
            </Card>
            <Card>
                Moin
            </Card>
            <Card>
                Moin
            </Card>
            <Card>
                Moin
            </Card>
            <Card>
                Moin
            </Card>
            <Card>
                Moin
            </Card>
            <Card>
                Moin
            </Card>
            <Card>
                Moin
            </Card>
        </div>
    </div>
</div>
