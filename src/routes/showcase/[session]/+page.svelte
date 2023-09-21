<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";

    export let data: ShowcaseSession;
</script>

<h2>{data.title}</h2>
{data.examples.map(e => e.title).join(', ')}