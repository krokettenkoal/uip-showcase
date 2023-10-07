<script lang="ts">
    import SessionCard from "$lib/components/SessionCard.svelte";
    import CardsContainer from "$lib/components/CardsContainer.svelte";
    import type {Course, Session, StudyProgram} from "$lib/api";
    import BackButton from "$lib/components/BackButton.svelte";
    import {base} from "$app/paths";

    export let data: {course: Course, sessions: Session[], studyProgram: StudyProgram};
</script>

<BackButton href="{base}/courses">
    Courses
</BackButton>

<h1 class="mdc-typography--headline3">
    {data.course.title} – {data.course.subtitle}
</h1>
<p class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
    {data.studyProgram.subtitle} ({data.studyProgram.title})
</p>

<CardsContainer>
    {#each data.sessions as session, i}
        <SessionCard {session} {i} />
    {:else}
        <p class="no-sessions">No sessions yet 😥</p>
    {/each}
</CardsContainer>

<style>
    .no-sessions {
        font-style: italic;
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: 2rem;
    }
</style>