<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";

    export let data: {sessions: ShowcaseSession[]};
</script>
<h1>Lecture examples</h1>
{#each data.sessions as session}
    {session.title}
{/each}