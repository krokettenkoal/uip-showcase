<script lang="ts">
    import type {Course, Session, StudyProgram} from "$lib/api";
    import DataTable, {
        Head,
        Body,
        Row,
        Cell,
        Label,
        SortValue,
    } from '@smui/data-table';
    import IconButton from '@smui/icon-button';

    export let data: {courses: Course[], sessions: Session[][], studyPrograms: StudyProgram[]};

    let sort: keyof Course = 'id';
    let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';

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
</script>

<h1 class="mdc-typography--headline3">Course administration</h1>
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
            <Cell columnId="subtitle">
                <Label>Full name</Label>
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="studyProgram">
                <Label>Study program</Label>
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell numeric columnId="sessions">
                <IconButton class="material-icons">arrow_upward</IconButton>
                <Label>Sessions</Label>
            </Cell>
            <Cell sortable={false}>Moodle course</Cell>
        </Row>
    </Head>
    <Body>
    {#each data.courses as course, idx (course.id)}
        <Row>
            <Cell numeric>{course.id}</Cell>
            <Cell>{course.title}</Cell>
            <Cell>{course.subtitle}</Cell>
            <Cell>{data.studyPrograms.find(p => p.id === course.studyProgramId)?.title ?? course.studyProgramId}</Cell>
            <Cell>{data.sessions[idx].length}</Cell>
            <Cell>{course.moodleUrl || '—'}</Cell>
        </Row>
    {/each}
    </Body>
</DataTable>