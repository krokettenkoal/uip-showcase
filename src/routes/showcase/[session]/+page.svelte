<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";
    import Button, {Icon, Label} from "@smui/button";
    import ExampleCard from "$lib/showcase/components/ExampleCard.svelte";
    import CardsContainer from "$lib/showcase/components/CardsContainer.svelte";

    export let data: ShowcaseSession;
</script>

<Button href="/showcase">
    <Icon class="material-icons">arrow_back_ios</Icon>
    <Label>Back</Label>
</Button>

<h2>{data.title}</h2>
<CardsContainer>
    {#each data.examples as example}
        <ExampleCard session={data} {example} />
    {/each}
</CardsContainer>