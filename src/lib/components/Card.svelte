<script>
    export let title = "Title";
</script>

<div class="h-auto w-auto bg-slate-800 rounded-xl text-white p-4">
    <h1 class="text-lg font-semibold text-neutral-400">{title}</h1>
    <slot />
</div>