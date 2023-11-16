<script lang="ts">
    import Fa from 'svelte-fa';
    import { faGear, faHome, faRightFromBracket, faUserGroup } from '@fortawesome/free-solid-svg-icons';
    import { currentSite } from '$lib/stores';

</script>

<div class="w-24 h-screen border-r border-slate-600 hidden md:flex flex-col justify-between text-center py-8 bg-white dark:bg-slate-800 text-black dark:text-white">
    <div class="w-full text-center flex flex-col gap-y-8">
        <a on:click={() => currentSite.set("Home")} class="mx-auto w-14 rounded-xl p-3 hover:bg-slate-700 {$currentSite == 'Home'? 'border border-black dark:border-slate-300': ''}" href="/"><Fa icon={faHome} size="25"/></a>
        <a on:click={() => currentSite.set("Accounts")} class="mx-auto w-14 rounded-xl p-3 hover:bg-slate-700 transition {$currentSite == 'Accounts'? 'border border-black dark:border-slate-300': ''}" href="/accounts"><Fa class="mx-auto" icon={faUserGroup} size="25"/></a>
        <a on:click={() => currentSite.set("Settings")} class="mx-auto w-14 rounded-xl p-3 hover:bg-slate-700 transition {$currentSite == 'Settings'? 'border border-black dark:border-slate-300': ''}" href="/settings"><Fa class="mx-auto" icon={faGear} size="25"/></a>
    </div>
    <a class="mx-auto rounded-xl p-3 w-14 text-center hover:bg-slate-700 transition" href="/login"><Fa class="mx-auto" icon={faRightFromBracket} size="25"/></a>
</div>