<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";
    import ExampleCard from "$lib/showcase/components/ExampleCard.svelte";
    import CardsContainer from "$lib/showcase/components/CardsContainer.svelte";
    import {onDestroy, onMount} from "svelte";
    import {title} from "$lib/stores";
    import BackButton from "$lib/components/BackButton.svelte";

    export let data: ShowcaseSession;

    onMount(() => {
        $title = data.title;
    });

    onDestroy(() => {
        $title = "";
    });
</script>

<BackButton>
    Library
</BackButton>

<h1 class="mdc-typography--headline3">{data.title}</h1>
<p class="mdc-typography--subtitle1 mdc-theme--text-secondary-on-background">{data.subtitle}</p>
<CardsContainer>
    {#each data.examples as example}
        <ExampleCard session={data} {example} />
    {/each}
</CardsContainer>