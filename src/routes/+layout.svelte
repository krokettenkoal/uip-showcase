<script lang="ts">
    import TopAppBar, {
        Row,
        Section,
        Title as AppBarTitle,
        AutoAdjust,
    } from '@smui/top-app-bar';
    import Drawer, {
        Content,
        Header,
        Title,
        Subtitle,
        Scrim,
    } from '@smui/drawer';
    import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list';
    import Accordion, { Panel, Header as AccordionHeader, Content as AccordionContent } from '@smui-extra/accordion';
    import IconButton from '@smui/icon-button';
    import {page} from "$app/stores";
    import type {ShowcaseSession} from "$lib/showcase/showcase";
    import {Icon} from "@smui/button";
    import Fa from "svelte-fa";
    import {faGithub} from "@fortawesome/free-brands-svg-icons";
    import {title} from "$lib/stores";
    import {ciMoodle} from "$lib/custom-icons";

    export let data: { sessions: ShowcaseSession[] };

    let topAppBar: TopAppBar, menuOpen: boolean = false, panelOpen: {[session: string]: boolean} = {};
</script>

<svelte:head>
    <title>
        {$title ? $title + ' | ' : ''}UIP Showcase
    </title>
</svelte:head>

<TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
        <Section>
            <IconButton on:click={() => menuOpen = !menuOpen} class="material-icons">menu</IconButton>
            <AppBarTitle>
                <a href="/" id="app-bar-title">UIP Showcase</a>
            </AppBarTitle>
        </Section>
        <Section align="end">
            <IconButton href="https://ecampus.fhstp.ac.at/course/view.php?id=31327" title="View course on eCampus" target="_blank">
                <Fa icon={ciMoodle} />
            </IconButton>
            <IconButton href="https://github.com/krokettenkoal/uip-showcase" title="View source code on GitHub" target="_blank">
                <Fa icon={faGithub} />
            </IconButton>
        </Section>
    </Row>
</TopAppBar>
<Drawer variant="modal" bind:open={menuOpen}>
    <Header>
        <Title>UIP Showcase</Title>
        <Subtitle>Try lecture examples first-hand.</Subtitle>
    </Header>
    <Content>
        <List>
            <Item href="/" activated={$page.url.pathname === '/'} on:click={() => menuOpen = !menuOpen}>
                <Graphic class="material-icons" aria-hidden="true">home</Graphic>
                <Text>Home</Text>
            </Item>
            <Item href="/showcase" activated={$page.url.pathname === '/showcase'} on:click={() => menuOpen = !menuOpen}>
                <Graphic class="material-icons" aria-hidden="true">integration_instructions</Graphic>
                <Text>Library</Text>
            </Item>

            <Separator />
            <Subheader tag="h6">Examples</Subheader>
            <Accordion>
            {#each data.sessions as session}
                <Panel bind:open={panelOpen[session.id]}>
                    <AccordionHeader>
                        {session.title}
                        <IconButton slot="icon" toggle pressed={panelOpen[session.id]}>
                            <Icon class="material-icons" on>expand_less</Icon>
                            <Icon class="material-icons">expand_more</Icon>
                        </IconButton>
                    </AccordionHeader>
                    <AccordionContent>
                        <List>
                            {#each session.examples as example}
                                <Item href="/showcase/{session.id}/{example.id}" activated={$page.url.pathname === `/showcase/${session.id}/${example.id}`} on:click={() => menuOpen = !menuOpen}>
                                    {#if example.icon}
                                        <Graphic class="material-icons" aria-hidden="true">{example.icon}</Graphic>
                                    {/if}
                                    <Text>{example.title}</Text>
                                </Item>
                            {/each}
                        </List>
                    </AccordionContent>
                </Panel>
            {/each}
            </Accordion>
        </List>
    </Content>
</Drawer>
<Scrim />
<AutoAdjust {topAppBar}>
    <div id="content-wrapper">
        <slot />
    </div>
</AutoAdjust>

<style>
    /* Hide everything above this component. */
    :global(#smui-app),
    :global(body),
    :global(html) {
        display: block !important;
        height: auto !important;
        width: auto !important;
        position: static !important;
    }

    #app-bar-title {
        color: inherit;
        text-decoration: inherit;
    }

    #content-wrapper {
        padding: 1rem;
    }

    @media screen and (min-width: 1200px){
        #content-wrapper {
            padding: 1rem 10rem;
        }
    }

    @media screen and (min-width: 1600px){
        #content-wrapper {
            padding: 1rem 20rem;
        }
    }
</style>