<script lang="ts">
    import SegmentedButton, { Segment } from "@smui/segmented-button";
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Highlight from "svelte-highlight";
    import xml from "svelte-highlight/languages/xml";
    import type {ShowcaseExample, ExampleSource} from "$lib/showcase/showcase";
    import {onMount} from "svelte";
    import defaultStyle from "svelte-highlight/styles/github-dark.css?inline";

    export let data: ShowcaseExample;

    let active: string = "Svelte", src: ExampleSource, style: string = defaultStyle;
    $: src = data.src.find(s => s.title === active) ?? data.src[0];

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
    <h2>{data.title}</h2>

    <section class="showcase-component">
        <svelte:component this={data.component} {...data.props} />
    </section>

    <section id="code">
        <h3>Source code</h3>
        <TabBar tabs={data.src.map(s => s.title)} let:tab bind:active>
            <Tab {tab} minWidth>
                <Label>{tab}</Label>
            </Tab>
        </TabBar>
        <Highlight language={src.language ?? xml} code={src.code} />
    </section>
</article>
