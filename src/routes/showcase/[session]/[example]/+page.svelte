<script lang="ts">
    import Showcase from "$lib/showcase/Showcase.svelte";
    import type {ShowcaseExample} from "$lib/showcase/showcase";
    import type {ShowcaseSession} from "$lib/showcase/showcase.js";
    import {onDestroy, onMount} from "svelte";
    import {title} from "$lib/stores/titleStore";
    import BackButton from "$lib/components/BackButton.svelte";

    export let data: { session: ShowcaseSession, example: ShowcaseExample };

    onMount(() => {
        $title = data.example.title;
    });

    onDestroy(() => {
        $title = "";
    });
</script>

<BackButton>
    {data.session.title}
</BackButton>
<Showcase data={data.example} />