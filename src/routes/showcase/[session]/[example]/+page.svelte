<script lang="ts">
    import Showcase from "$lib/showcase/Showcase.svelte";
    import type {ShowcaseExample} from "$lib/showcase/showcase";
    import Button, { Label, Icon } from '@smui/button';
    import type {ShowcaseSession} from "$lib/showcase/showcase.js";

    export let data: { session: ShowcaseSession, example: ShowcaseExample };
</script>

<svelte:head>
    <title>{data.example.title} | UIP Showcase</title>
</svelte:head>

<Button href="/showcase/{data.session.id}">
    <Icon class="material-icons">arrow_back_ios</Icon>
    <Label>Back</Label>
</Button>
<Showcase data={data.example} />