<script lang="ts">
    import type {ActionData, PageData} from "./$types";
    import type {BaseStudyProgram, Course, Session, StudyProgram} from "$lib/api";
    import DataTable, {
        Head,
        Body,
        Row,
        Cell,
        Label,
        SortValue,
    } from '@smui/data-table';
    import IconButton from '@smui/icon-button';
    import Dialog, {Actions, Content, Header, Title, InitialFocus } from "@smui/dialog";
    import Button, {Label as ButtonLabel, Icon as ButtonIcon} from "@smui/button";
    import Textfield from "@smui/textfield";
    import TextfieldIcon from "@smui/textfield/icon";
    import {Text} from "@smui/list";
    import Autocomplete from "@smui-extra/autocomplete";
    import Snackbar, { Label as SnackbarLabel, Actions as SnackbarActions } from '@smui/snackbar';
    import {StudyprogramApi} from "$lib/api";
    import {onMount} from "svelte";
    import {base} from "$app/paths";
    import Fa from "svelte-fa";
    import {ciMoodle} from "$lib/custom-icons";

    export let data: {courses: Course[], sessions: Session[][], studyPrograms: StudyProgram[]};
    export let form: ActionData;

    let sort: keyof Course = 'id',
        sortDirection: Lowercase<keyof typeof SortValue> = 'ascending',
        courseCreateOpen: boolean = false,
        studyProgramCreateOpen: boolean = false,
        newCourseTitle: string = form?.data?.title ?? '',
        newCourseStudyProgramText: string = '',
        newStudyProgramTitle: string = '',
        newCourseStudyProgram: StudyProgram | undefined = form?.data?.studyProgramId ? data.studyPrograms.find(p => p.id === form?.data?.studyProgramId) : undefined,
        snackbarSuccess: Snackbar,
        snackbarError: Snackbar;

    const studyProgramApi = new StudyprogramApi();

    function handleSort() {
        data.courses.sort((a, b) => {
            const [aVal, bVal] = [a[sort], b[sort]][
                sortDirection === 'ascending' ? 'slice' : 'reverse'
                ]();
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal);
            }
            return Number(aVal) - Number(bVal);
        });
        data.courses = data.courses;
    }

    async function createStudyProgram(): Promise<void> {
        const newStudyProgram: BaseStudyProgram = {
            title: newStudyProgramTitle,
        };
        newCourseStudyProgram = await studyProgramApi.createStudyProgram(newStudyProgram);
        data.studyPrograms.push(newCourseStudyProgram);
        studyProgramCreateOpen = false;
    }

    function getStudyProgramDropdownLabel(p?: StudyProgram): string {
        return p?.title ?? '';
    }

    onMount(() => {
        if(form?.success)
            snackbarSuccess?.open();
        else if(form?.error)
            snackbarError?.open();
    });
</script>

<h1 class="mdc-typography--headline3">Courses</h1>

<DataTable
        sortable
        bind:sort
        bind:sortDirection
        on:SMUIDataTable:sorted={handleSort}
        table$aria-label="Course list"
        style="width: 100%;"
>
    <Head>
        <Row>
            <Cell numeric columnId="id">
                <!-- For numeric columns, icon comes first. -->
                <IconButton class="material-icons">arrow_upward</IconButton>
                <Label>ID</Label>
            </Cell>
            <Cell columnId="title">
                <Label>Acronym</Label>
                <!-- For non-numeric columns, icon comes second. -->
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="subtitle" style="width: 100%">
                <Label>Full name</Label>
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="studyProgram">
                <Label>Study program</Label>
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="moodleUrl" sortable={false}>Moodle</Cell>
            <Cell numeric columnId="sessions">
                <IconButton class="material-icons">arrow_upward</IconButton>
                <Label>Sessions</Label>
            </Cell>
            <Cell columnId="edit" sortable={false}>Edit</Cell>
        </Row>
    </Head>
    <Body>
    {#each data.courses as course, idx (course.id)}
        {@const studyProgram = data.studyPrograms.find(p => p.id === course.studyProgramId)}
        <Row>
            <Cell numeric>{course.id}</Cell>
            <Cell>{course.title}</Cell>
            <Cell>{course.subtitle || '—'}</Cell>
            <Cell title={studyProgram?.subtitle ?? ''}>{studyProgram?.title ?? course.studyProgramId}</Cell>
            <Cell>
                {#if course.moodleUrl}
                <a class="icon-button moodle" href={course.moodleUrl} title="View course on eCampus" target="_blank">
                    <Fa icon={ciMoodle} />
                </a>
                {:else}
                    —
                {/if}
            </Cell>
            <Cell>{data.sessions[idx].length}</Cell>
            <Cell>
                <a href="{base}/admin/courses/{course.id}" class="icon-button">
                    <ButtonIcon class="material-icons">edit</ButtonIcon>
                </a>
            </Cell>
        </Row>
    {/each}
    </Body>
</DataTable>

<div id="course-create-open">
    <Button variant="outlined" color="primary" class="btn-shaped-round" on:click={() => courseCreateOpen = true}>
        <ButtonIcon class="material-icons">add</ButtonIcon>
        <ButtonLabel>New course</ButtonLabel>
    </Button>
</div>

<Dialog id="course-create"
        bind:open={courseCreateOpen}
        aria-labelledby="course-create-title"
        aria-describedby="course-create-content"
        fullscreen
>
    <Header>
        <Title id="course-create-title">
            New course
        </Title>
    </Header>
    <Content id="course-create-content">
        <p>Create a new course for a study program.</p>
        <form id="new-course" method="POST" action="?/create">
            <div class="form-group">
                <Textfield
                        use={[InitialFocus]}
                        input$name="title"
                        input$minlength={2}
                        input$placeholder="BMT, BCC, MDH,..."
                        label="Acronym"
                        style="width: 100%;"
                        helperLine$style="width: 100%;"
                        bind:value={newCourseTitle}
                        required
                        invalid={form?.missing?.includes('title')}
                >
                    <TextfieldIcon slot="leadingIcon" class="material-icons">title</TextfieldIcon>
                </Textfield>
            </div>

            <div class="form-group">
                <Autocomplete
                        options={data.studyPrograms.sort((a, b) => a.title.localeCompare(b.title))}
                        getOptionLabel={getStudyProgramDropdownLabel}
                        bind:value={newCourseStudyProgram}
                        bind:text={newCourseStudyProgramText}
                        noMatchesActionDisabled={false}
                        on:SMUIAutocomplete:noMatchesAction={() => {newStudyProgramTitle = newCourseStudyProgramText; studyProgramCreateOpen = true;}}
                        label="Study program"
                        textfield$required
                        textfield$invalid={form?.missing?.includes('studyProgramId')}
                >
                    <div id="new-studyprogram-dropdown" slot="no-matches">
                        <ButtonIcon class="material-icons">add</ButtonIcon>
                        <Text>Add new</Text>
                    </div>
                </Autocomplete>
            </div>

            <div class="form-group">
                <Textfield
                        input$name="subtitle"
                        input$placeholder="Media Technology, Creative Computing,..."
                        label="Full name"
                        style="width: 100%;"
                        helperLine$style="width: 100%;"
                        value={form?.data?.subtitle ?? ''}
                >
                    <TextfieldIcon slot="leadingIcon" class="material-icons">short_text</TextfieldIcon>
                </Textfield>
            </div>

            <div class="form-group">
                <Textfield
                        input$name="moodleUrl"
                        input$placeholder="https://ecampus.fhstp.ac.at/course/view.php?id=31327"
                        label="Moodle URL"
                        style="width: 100%;"
                        helperLine$style="width: 100%;"
                        value={form?.data?.moodleUrl ?? ''}
                >
                    <TextfieldIcon slot="leadingIcon" class="material-icons">link</TextfieldIcon>
                </Textfield>
            </div>

            {#if newCourseStudyProgram}
                <input type="hidden" name="studyProgramId" value={newCourseStudyProgram.id} />
            {/if}
        </form>
    </Content>
    <Actions>
        <Button
                defaultAction
                type="reset"
                form="new-course"
                action="close"
        >
            <ButtonLabel>Cancel</ButtonLabel>
        </Button>
        <Button
                class="btn-success"
                type="submit"
                form="new-course"
                accesskey="s"
                disabled={!newCourseTitle || !newCourseStudyProgram}
        >
            <ButtonIcon class="material-icons">library_add</ButtonIcon>
            <ButtonLabel>Create</ButtonLabel>
        </Button>
    </Actions>
</Dialog>

<Dialog id="autocomplete-dialog"
        slot="over"
        bind:open={studyProgramCreateOpen}
        aria-labelledby="autocomplete-dialog-title"
        aria-describedby="autocomplete-dialog-content"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Title id="autocomplete-dialog-title">New study program</Title>
    <Content id="autocomplete-dialog-content">
        <Textfield bind:value={newStudyProgramTitle} label="Title (short)" />
    </Content>
    <Actions>
        <Button>
            <ButtonLabel>Cancel</ButtonLabel>
        </Button>
        <Button on:click={createStudyProgram}>
            <ButtonLabel>Create</ButtonLabel>
        </Button>
    </Actions>
</Dialog>

<Snackbar bind:this={snackbarSuccess} class="success">
    <SnackbarLabel>Course has been created successfully.</SnackbarLabel>
    <SnackbarActions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </SnackbarActions>
</Snackbar>

<Snackbar bind:this={snackbarError} labelText={form?.error?.message} class="danger">
    <SnackbarLabel>Course could not be created!</SnackbarLabel>
    <SnackbarActions>
        <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </SnackbarActions>
</Snackbar>

<style>
    #course-create-open {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }

    form {
        padding: 2rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-content: center;
        gap: 2rem;
    }

    .form-group {
        flex-grow: 1;
        flex-basis: 40%;
    }

    #new-studyprogram-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: .5rem;
    }

    .icon-button {
        color: var(--mdc-theme-primary);
    }

    .moodle {
        color: #f98012;
    }
</style>