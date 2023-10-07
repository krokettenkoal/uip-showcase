<script lang="ts">
    import Showcase from "$lib/showcase/Showcase.svelte";
    import {onDestroy, onMount, SvelteComponent} from "svelte";
    import {title} from "$lib/stores/titleStore";
    import BackButton from "$lib/components/BackButton.svelte";
    import type {Example, Session, Source} from "$lib/api";
    import {base} from "$app/paths";

    export let data: { session: Session, example: Example, component?: typeof SvelteComponent, sources: Source[]};

    onMount(() => {
        $title = data.example.title;
    });

    onDestroy(() => {
        $title = "";
    });
</script>

<BackButton href="{base}/courses/{data.session.courseId}/{data.session.id}">
    {data.session.title}
</BackButton>
<Showcase {...data} />