<script lang="ts">
    import ExampleCard from "$lib/components/ExampleCard.svelte";
    import CardsContainer from "$lib/components/CardsContainer.svelte";
    import {onDestroy, onMount} from "svelte";
    import {title} from "$lib/stores";
    import BackButton from "$lib/components/BackButton.svelte";
    import type {Course, Example, Session} from "$lib/api";

    export let data: {course: Course, session: Session, examples: Example[]};

    onMount(() => {
        $title = data.session.title;
    });

    onDestroy(() => {
        $title = "";
    });
</script>

<BackButton>
    Back to course ({data.course.title})
</BackButton>

<h1 class="mdc-typography--headline3">
    {data.course.title} – {data.session.title}
</h1>
<p class="mdc-typography--subtitle1 mdc-theme--text-secondary-on-background">
    {data.session.subtitle}
</p>
<CardsContainer>
    {#each data.examples as example, i}
        <ExampleCard session={data.session} {example} {i} />
    {/each}
</CardsContainer>