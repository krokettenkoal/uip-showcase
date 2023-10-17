<script lang="ts">
    import type {Course, Session, StudyProgram} from "$lib/api";
    import Card, {
        Content,
        Actions,
    } from '@smui/card';
    import Button, {Icon, Label} from '@smui/button';
    import Chip, { Set, Text } from '@smui/chips';
    import CardsContainer from "$lib/components/CardsContainer.svelte";
    import Hero, {Title, Content as HeroContent} from "$lib/components/hero";
    import {base} from "$app/paths";

    export let data: { sessions: Session[][], courses: Course[], studyPrograms: StudyProgram[] };

    function sessionChip(sessions: Session[]): string {
        if(sessions.length === 0) return 'No sessions yet 😥';
        const suffix = sessions.length === 1 ? '' : 's';
        return `${sessions.length} session${suffix}`;
    }
</script>

<Hero>
    <Title>All courses</Title>
    <HeroContent>
        <CardsContainer>
            {#each data.courses as course, i}
                {@const program = data.studyPrograms.find(prog => prog.id === course.studyProgramId)}
                {@const sessions = data.sessions[i]}
                <Card style="--i:{i}; text-align: center">
                    <Content>
                        <h2 class="mdc-typography--headline3 course-name">
                            {course.title}
                        </h2>
                        <p class="mdc-typography--subtitle2 mdc-theme--text-disabled-on-background">
                            {course.subtitle}
                        </p>
                        <Set chips={[program?.title, sessionChip(sessions)]} let:chip nonInteractive>
                            {#if chip}
                            <Chip {chip}>
                                <Text>{chip}</Text>
                            </Chip>
                            {/if}
                        </Set>
                    </Content>
                    <Actions>
                        <Button href="{base}/courses/{course.id}">
                            <Label>Go to course</Label>
                            <i class="material-icons" aria-hidden="true">arrow_forward</i>
                        </Button>
                    </Actions>
                </Card>
            {/each}
        </CardsContainer>
    </HeroContent>
</Hero>

<style>
    .course-name {
        margin-bottom: .5rem;
    }
</style>
