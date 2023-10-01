<script lang="ts">
    import SessionCard from "$lib/components/SessionCard.svelte";
    import CardsContainer from "$lib/components/CardsContainer.svelte";
    import type {Course, Session} from "$lib/api";

    export let data: {course: Course, sessions: Session[]};
</script>

<h1 class="mdc-typography--headline3">{data.course.subtitle}</h1>
<CardsContainer>
    {#each data.sessions as session}
        <SessionCard {session} />
    {/each}
</CardsContainer>