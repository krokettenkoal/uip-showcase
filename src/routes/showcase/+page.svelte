<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";
    import SessionCard from "$lib/components/SessionCard.svelte";
    import CardsContainer from "$lib/components/CardsContainer.svelte";

    export let data: {sessions: ShowcaseSession[]};
</script>

<h1 class="mdc-typography--headline3">Library</h1>
<CardsContainer>
    {#each data.sessions as session}
        <SessionCard {session} />
    {/each}
</CardsContainer>