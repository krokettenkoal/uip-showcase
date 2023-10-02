<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Highlight from "svelte-highlight";
    import xml from "svelte-highlight/languages/xml";
    import {onMount, SvelteComponent} from "svelte";
    import defaultStyle from "svelte-highlight/styles/github-dark.css?inline";
    import Fa from "svelte-fa";
    import Paper, {Content} from "@smui/paper";
    import type {Example, Session, Source, SourceType} from "$lib/api";
    import {SourcetypeApi} from "$lib/api";
    import type {LanguageType} from "svelte-highlight/languages";
    import {loadIcon} from "$lib/custom-icons";
    import {Icon} from "@smui/button";

    export let example: Example;
    export let component: (typeof SvelteComponent) | undefined = undefined;
    export let sources: Source[];

    let active: Source = sources[0], style: string = defaultStyle, types: SourceType[] = [], activeType: SourceType|undefined;
    $: activeType = types.find(t => t.id === active?.typeId);

    const key = (src: Source) => src.id;

    async function getSourceLanguage(sourceType: SourceType|undefined): Promise<LanguageType<string>> {
        if(!sourceType?.language)
            return xml;

        return (await import(`../../../node_modules/svelte-highlight/languages/${sourceType.language}`)).default;
    }

    function sortSource(a: Source, b: Source): number {
        //  Sort by priority, then by id
        return (a.priority - b.priority) || (a.id - b.id);
    }

    onMount(async () => {
        const themeSuffix = window.matchMedia("(prefers-color-scheme: dark)").matches ? "-dark" : "";
        const sourceTypeApi = new SourcetypeApi();
        types = await Promise.all(sources.map(src => sourceTypeApi.getSourceTypeById(src.typeId)));

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
    <h1 class="mdc-typography--headline3">{example.title}</h1>
    {#if example.subtitle}
        <p class="mdc-typography--subtitle1 mdc-theme--text-secondary-on-background">{example.subtitle}</p>
    {/if}

    {#if component}
    <section class="showcase-component">
        <Paper>
            <Content class="component">
                <svelte:component this={component} {...$$restProps} />
            </Content>
        </Paper>
    </section>
    {/if}

    <section id="code">
        <h2 class="mdc-typography--headline4">Source code</h2>
        <p class="mdc-typography--subtitle1 mdc-theme--text-secondary-on-background">
            The source codes shown below do not include any styling, only structure and logic.
        </p>
        <TabBar tabs={sources.sort(sortSource)} {key} let:tab bind:active>
            {@const sourceType = types.find(t => t.id === tab.typeId)}
            <Tab {tab} minWidth>
                <Label>
                    {#await loadIcon(sourceType?.icon)}
                        <Icon class="material-icons">code</Icon>
                    {:then icon}
                    {#if icon}
                        <Fa {icon} />
                    {/if}
                    {/await}
                    {tab.title ?? sourceType?.title}
                </Label>
            </Tab>
        </TabBar>
        {#await getSourceLanguage(activeType) then lang}
            <Highlight language={lang} code={active.code} class="code" />
        {/await}
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
