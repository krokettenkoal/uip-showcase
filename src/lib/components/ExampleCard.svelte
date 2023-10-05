<script lang="ts">
    import Card, {
        Content,
        Media,
        Actions,
    } from '@smui/card';
    import Button, {Icon, Label} from '@smui/button';
    import Fa from "svelte-fa";
    import type {Example, Session, SourceType} from "$lib/api";
    import {onMount} from "svelte";
    import {SourceApi} from "$lib/api";
    import {loadIcon} from "$lib/custom-icons";
    import {getSourceType} from "$lib/api/factory";
    import {base} from "$app/paths";

    export let session: Session;
    export let example: Example;
    export let i: number = 0;

    const sourceApi = new SourceApi();
    let types: SourceType[] = [];

    onMount(async () => {
        const sources = await sourceApi.getSourcesByExample(example.id);
        types = await Promise.all(sources.map(src => getSourceType(src.typeId)));
    });
</script>

<Card {...$$restProps} style="--i:{i}">
    <Media class="card-media-16x9" aspectRatio="16x9" style="background-image:url({base}/img/examples/{example.image || 'placeholder.jpg'})" />
    <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {example.title}
        </h2>
        {#if example.subtitle}
            <p class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
                {example.subtitle}
            </p>
        {/if}
        <ul class="sources">
            {#each types as src (src.id)}
                {#await loadIcon(src.icon)}
                    <Icon class="material-icons">code</Icon>
                {:then icon}
                <li title={src.title}>
                    {#if icon}
                        <Fa {icon} />

                    {:else}
                        {src.title}
                    {/if}
                </li>
                {/await}
            {/each}
        </ul>
    </Content>
    <Actions>
        <Button href="{base}/courses/{session.courseId}/{session.id}/{example.id}">
            <Label>View example</Label>
            <Icon class="material-icons">arrow_forward</Icon>
        </Button>
    </Actions>
</Card>

<style>
    ul.sources {
        list-style: none;
        padding: 0;
        display: flex;
        flex-flow: row wrap;
        column-gap: 1rem;
        row-gap: .5rem;
        font-size: 1.5rem;
        color: var(--mdc-theme-text-hint-on-background);
    }
</style>