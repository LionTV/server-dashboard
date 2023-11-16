<script>
    import { browser } from "$app/environment";
    import Navbar from "$lib/components/Navbar.svelte";

    function toggleLightMode() {
        if (browser) {
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }

            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        }
    }
</script>
<div class="h-screen flex">
    <Navbar />
    <div class="bg-slate-700 w-full h-full">
        <button on:click={toggleLightMode} >Toggle</button>
    </div>
</div>