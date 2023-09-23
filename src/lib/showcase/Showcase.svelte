<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Highlight from "svelte-highlight";
    import xml from "svelte-highlight/languages/xml";
    import type {ShowcaseExample, ExampleSource} from "$lib/showcase/showcase";
    import {onMount} from "svelte";
    import defaultStyle from "svelte-highlight/styles/github-dark.css?inline";
    import Fa from "svelte-fa";
    import Paper, {Content} from "@smui/paper";

    export let data: ShowcaseExample;

    let active: ExampleSource = data.src[0], style: string = defaultStyle;

    const key = (src: ExampleSource) => src.title;

    onMount(async () => {
        const themeSuffix = window.matchMedia("(prefers-color-scheme: dark)").matches ? "-dark" : "";
        try {
            style = (await import(`../../../node_modules/svelte-highlight/styles/github${themeSuffix}.css?inline`)).default;
        }
        catch (e) {
            console.warn(`Failed to load code style for current theme!`);
            console.error(e);
        }
    });
</script>

<svelte:head>
    {@html '<style>{style}</style>'}
</svelte:head>

<article class="showcase">
    <h1 class="mdc-typography--headline3">{data.title}</h1>

    <section class="showcase-component">
        <Paper>
            <Content class="component">
                <svelte:component this={data.component} {...data.props} />
            </Content>
        </Paper>
    </section>

    <section id="code">
        <h2 class="mdc-typography--headline4">Source code</h2>
        <p class="mdc-typography--subtitle1 mdc-theme--text-secondary-on-background">
            The source codes shown below do not include any styling, only structure and logic.
        </p>
        <TabBar tabs={data.src} {key} let:tab bind:active>
            <Tab {tab} minWidth>
                <Label>
                    {#if tab.icon}
                        <Fa icon={tab.icon} />
                    {/if}
                    {tab.title}
                </Label>
            </Tab>
        </TabBar>
        <Highlight language={active.language ?? xml} code={active.code} class="code" />
    </section>
</article>

<style>
    :global(.component){
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    :global(.code){
        border-radius: 4px;
        overflow: clip;
    }
</style>
