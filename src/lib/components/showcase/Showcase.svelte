<script lang="ts" context="module">
    import defaultStyle from "svelte-highlight/styles/github-dark.css?inline";
    import xml from "svelte-highlight/languages/xml";
    import type {LanguageType} from "svelte-highlight/languages";

    async function loadHighlightLanguage(sourceType: SourceType|undefined): Promise<LanguageType<string>> {
        if(!sourceType?.language)
            return xml;

        return (await import(`../../../../node_modules/svelte-highlight/languages/${sourceType.language}.js`)).default ?? xml;
    }

    async function loadHighlightStyle(): Promise<string> {
        const themeSuffix = window.matchMedia("(prefers-color-scheme: dark)").matches ? "-dark" : "";
        return (await import(`../../../../node_modules/svelte-highlight/styles/github${themeSuffix}.css?inline`)).default;
    }

</script>
<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Highlight from "svelte-highlight";
    import type {ComponentType} from "svelte";
    import {onMount} from "svelte";
    import Fa from "svelte-fa";
    import Paper, {Content} from "@smui/paper";
    import type {Example, Source, SourceType} from "$lib/api";
    import {SourcetypeApi} from "$lib/api";
    import {loadIcon} from "$lib/custom-icons";
    import {Icon} from "@smui/button";
    import {onNavigate} from "$app/navigation";

    export let example: Example;
    export let component: ComponentType | undefined = undefined;
    export let sources: Source[];
    export let props: object|undefined = undefined;

    let active: Source = sources[0], types: SourceType[] = [], activeType: SourceType|undefined, highlightStyle: string = defaultStyle;
    $: activeType = types.find(t => t.id === active?.typeId);

    const key = (src: Source) => src.id;

    function sortSource(a: Source, b: Source): number {
        //  Sort by priority, then by id
        return (a.priority - b.priority) || (a.id - b.id);
    }

    async function updateHighlightStyle(...args: any[]){
        try {
            highlightStyle = await loadHighlightStyle();
        }
        catch (e) {
            console.warn(`Failed to load code style for current theme!`);
            console.error(e);
        }
    }

    onMount(async () => {
        await updateHighlightStyle();
        const sourceTypeApi = new SourcetypeApi();
        types = await Promise.all(sources.map(src => sourceTypeApi.getSourceTypeById(src.typeId)));
        active = sources[0];
        activeType = types.find(t => t.id === active?.typeId)
    });

    onNavigate(() => {
        active = sources[0];
    });
</script>

<svelte:head>
    {@html '<style>{highlightStyle}</style>'}
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
                <svelte:component this={component} {...props} />
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
        {#await loadHighlightLanguage(activeType) then lang}
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
