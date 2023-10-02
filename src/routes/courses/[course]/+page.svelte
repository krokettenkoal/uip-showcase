<script lang="ts">
    import SessionCard from "$lib/components/SessionCard.svelte";
    import CardsContainer from "$lib/components/CardsContainer.svelte";
    import type {Course, Session, StudyProgram} from "$lib/api";

    export let data: {course: Course, sessions: Session[], studyProgram: StudyProgram};
</script>

<h1 class="mdc-typography--headline3">
    {data.course.subtitle} ({data.course.title})
</h1>
<p class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
    {data.studyProgram.subtitle} ({data.studyProgram.title})
</p>
<CardsContainer>
    {#each data.sessions as session}
        <SessionCard {session} />
    {/each}
</CardsContainer>