<script lang="ts">
    import type {ShowcaseSession, ShowcaseExample} from "$lib/showcase/showcase";
    import Card, {
        Content,
        Media,
        Actions,
    } from '@smui/card';
    import Button, {Icon, Label} from '@smui/button';
    import Fa from "svelte-fa";

    export let session: ShowcaseSession;
    export let example: ShowcaseExample;
</script>

<Card class="example">
    <Media class="card-media-16x9" aspectRatio="16x9" style="background-image:url(/img/examples/{example.image || 'placeholder.jpg'})" />
    <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {example.title}
        </h2>
        {#if example.subtitle}
            <h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
                {example.subtitle}
            </h3>
        {/if}
        <ul class="sources">
            {#each example.src as src (src.title)}
                <li title={src.title}>
                    {#if src.icon}
                        <Fa icon={src.icon} />
                    {:else}
                        {src.title}
                    {/if}
                </li>
            {/each}
        </ul>
    </Content>
    <Actions>
        <Button href="/showcase/{session.id}/{example.id}">
            <Label>View example</Label>
            <Icon class="material-icons">arrow_forward</Icon>
        </Button>
    </Actions>
</Card>

<style>
    :global(.example) {
        min-width: 18rem;
    }

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

    @media screen and (min-width: 768px){
        :global(.example) {
            max-width: 20rem;
        }
    }
</style>