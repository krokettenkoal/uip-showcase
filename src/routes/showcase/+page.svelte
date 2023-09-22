<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";
    import SessionCard from "$lib/showcase/components/SessionCard.svelte";

    export let data: {sessions: ShowcaseSession[]};
</script>
<h1 class="mdc-typography--headline3">Lecture examples</h1>
<div class="sessions">
    {#each data.sessions as session}
        <SessionCard {session} />
    {/each}
</div>

<style>
    .sessions {
        display: flex;
        flex-flow: row wrap;
    }
</style>
