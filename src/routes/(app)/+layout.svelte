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
    import {Label} from '@smui/common';
    import Badge from '@smui-extra/badge';
    import LinearProgress from '@smui/linear-progress';
    import Accordion, { Panel, Header as AccordionHeader, Content as AccordionContent } from '@smui-extra/accordion';
    import IconButton from '@smui/icon-button';
    import {navigating, page} from "$app/stores";
    import {Icon} from "@smui/button";
    import Fa from "svelte-fa";
    import {faGithub} from "@fortawesome/free-brands-svg-icons";
    import {title} from "$lib/stores";
    import type {Course, Session, StudyProgram} from "$lib/api";
    import config from "$lib/config/site.config";
    import {base} from "$app/paths";
    import type {Session as AuthSession} from '@auth/core/types';

    export let data: { sessions: Session[][], courses: Course[], studyPrograms: StudyProgram[], authSession?: AuthSession };

    let topAppBar: TopAppBar, menuOpen: boolean = false, panelOpen: {[session: string]: boolean} = {};

    function studyProgramName(course: Course): string {
        const studyProgram = data.studyPrograms.find(program => program.id === course.studyProgramId);
        return studyProgram?.title ?? "ALL";
    }
</script>

<svelte:head>
    <title>
        {$title ? $title + ' | ' : ''}{config.siteName}
    </title>
</svelte:head>

<TopAppBar bind:this={topAppBar} variant="standard">
    <Row>
        <Section>
            <IconButton on:click={() => menuOpen = !menuOpen} class="material-icons">menu</IconButton>
            <AppBarTitle>
                <a href="{base}/" id="app-bar-title">{config.siteName}</a>
            </AppBarTitle>
        </Section>
        <Section align="end">
            <IconButton href="https://github.com/krokettenkoal/uip-showcase" title="View source code on GitHub" target="_blank">
                <Fa icon={faGithub} />
            </IconButton>
        </Section>
    </Row>
</TopAppBar>
<Drawer variant="modal" bind:open={menuOpen}>
    <Header>
        <Title>{config.siteName}</Title>
        <Subtitle>Try lecture examples first-hand.</Subtitle>
    </Header>
    <Content>
        <List>
            <Item href="{base}/" activated={$page.url.pathname === base+'/'} on:click={() => menuOpen = !menuOpen}>
                <Graphic class="material-icons" aria-hidden="true">home</Graphic>
                <Text>Home</Text>
            </Item>
            <Item href="{base}/courses" activated={$page.url.pathname === base+'/courses'} on:click={() => menuOpen = !menuOpen}>
                <Graphic class="material-icons" aria-hidden="true">integration_instructions</Graphic>
                <Text>All courses</Text>
            </Item>

            <Separator />
            <Subheader tag="h6">Courses</Subheader>
            <Accordion>
            {#each data.courses as course, i}
                <Panel bind:open={panelOpen[course.id]}>
                    <AccordionHeader>
                        <Label>{course.title}</Label>
                        <IconButton slot="icon" toggle pressed={panelOpen[course.id]}>
                            <Badge class="program-badge" position="outset" align="middle-start">{studyProgramName(course)}</Badge>
                            <Icon class="material-icons" on>expand_less</Icon>
                            <Icon class="material-icons">expand_more</Icon>
                        </IconButton>
                    </AccordionHeader>
                    <AccordionContent>
                        <List>
                            {#each data.sessions[i] as session}
                                <Item href="{base}/courses/{course.id}/{session.id}" activated={$page.url.pathname === base+`/courses/${course.id}/${session.id}`} on:click={() => menuOpen = !menuOpen}>
                                    <Text>{session.title}</Text>
                                </Item>
                            {:else}
                                <Item disabled><Text>No sessions found.</Text></Item>
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
    {#if $navigating}
        <LinearProgress indeterminate />
    {/if}
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

    :global(.program-badge){
        padding: 0 .5rem;
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