<script lang="ts">
	import type { Course, Session, StudyProgram } from '$lib/api';
	import Dialog, { Actions, Content, InitialFocus, Title } from '@smui/dialog';
	import { Text } from '@smui/list';
	import Autocomplete from '@smui-extra/autocomplete';
	import Textfield from '@smui/textfield';
	import TextfieldIcon from '@smui/textfield/icon';
	import Paper, {
		Title as PaperTitle,
		Subtitle as PaperSubtitle,
		Content as PaperContent
	} from '@smui/paper';
	import Button, { Label as ButtonLabel, Icon as ButtonIcon } from '@smui/button';
	import BackButton from '$lib/components/BackButton.svelte';
	import { base } from '$app/paths';
	import IconButton from '@smui/icon-button';
	import Snackbar, { Label as SnackbarLabel, Actions as SnackbarActions } from '@smui/snackbar';
	import { onMount } from 'svelte';
	import DataTable, { Body, Cell, Head, Label, Row, SortValue } from '@smui/data-table';

	export let data;
	export let form;

	let sort: keyof Session = 'id',
		sortDirection: Lowercase<keyof typeof SortValue> = 'ascending',
		studyProgramText: string | undefined = data.studyProgram?.title,
		newStudyProgramTitle: string = '',
		studyProgramCreateOpen: boolean = false,
		sessionCreateOpen: boolean = false,
		newSessionTitle: string = '',
		snackbarSuccess: Snackbar,
		snackbarError: Snackbar;

	const originalCourse: Course = { ...data.course },
		originalStudyProgram: StudyProgram | undefined = data.studyProgram ? { ...data.studyProgram } : undefined;

	function handleSort() {
		data.courseSessions.sort((a, b) => {
			const [aVal, bVal] = [a[sort], b[sort]][
				sortDirection === 'ascending' ? 'slice' : 'reverse'
				]();
			if (typeof aVal === 'string' && typeof bVal === 'string') {
				return aVal.localeCompare(bVal);
			}
			return Number(aVal) - Number(bVal);
		});
		data.courseSessions = data.courseSessions;
	}

	function getStudyProgramDropdownLabel(p?: StudyProgram): string {
		return p?.title ?? '';
	}

	function dateFriendly(d?: string): string {
		if (!d) return 'none';

		return new Date(d).toLocaleDateString('en-GB', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function hasChanges(c?: Course, sp?: StudyProgram): boolean {
		return (
			c?.title !== originalCourse.title ||
			c?.subtitle !== originalCourse.subtitle ||
			c?.moodleUrl !== originalCourse.moodleUrl ||
			sp?.id !== originalStudyProgram?.id
		);
	}

	onMount(() => {
		if (form?.success) snackbarSuccess?.open();
		else if (form?.error) snackbarError?.open();
	});
</script>

<BackButton href="{base}/admin/courses">Courses</BackButton>

<h1 class="mdc-typography--headline3">
	{data.course.title}
	<span class="mdc-theme--text-secondary-on-background mdc-typography--headline5"> | Edit </span>
</h1>

<Paper variant="unelevated">
	<PaperTitle tag="h2">Details</PaperTitle>
	<PaperSubtitle>Edit course details</PaperSubtitle>
	<PaperContent>
		<form id="edit-course" method="POST" action="?/update">
			<div class="fields">
				<div class="form-group">
					<Textfield
						use={[InitialFocus]}
						input$name="title"
						input$minlength={2}
						input$placeholder="BMT, BCC, MDH,..."
						label="Acronym"
						style="width: 100%;"
						helperLine$style="width: 100%;"
						bind:value={data.course.title}
						required
					>
						<TextfieldIcon slot="leadingIcon" class="material-icons">title</TextfieldIcon>
					</Textfield>
				</div>

				<div class="form-group">
					<Autocomplete
						options={data.studyPrograms.sort((a, b) => a.title.localeCompare(b.title))}
						getOptionLabel={getStudyProgramDropdownLabel}
						bind:value={data.studyProgram}
						bind:text={studyProgramText}
						noMatchesActionDisabled={false}
						on:SMUIAutocomplete:noMatchesAction={() => {
							newStudyProgramTitle = studyProgramText ?? '';
							studyProgramCreateOpen = true;
						}}
						label="Study program"
						textfield$required
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
						value={data.course.subtitle ?? ''}
					>
						<TextfieldIcon slot="leadingIcon" class="material-icons">short_text</TextfieldIcon>
					</Textfield>
				</div>

				<div class="form-group">
					<Textfield
						input$name="moodleUrl"
						input$placeholder="https://ecampus.fhstp.ac.at/course/view.php?id=31327"
						type="url"
						label="Moodle URL"
						style="width: 100%;"
						helperLine$style="width: 100%;"
						value={data.course.moodleUrl ?? ''}
					>
						<TextfieldIcon slot="leadingIcon" class="material-icons">link</TextfieldIcon>
					</Textfield>
				</div>

				{#if data.studyProgram?.id}
					<input type="hidden" name="studyProgramId" value={data.studyProgram.id} />
				{/if}
			</div>
			<div class="actions">
				<Button
					class="btn-success"
					type="submit"
					form="edit-course"
					accesskey="s"
					disabled={!data.course.title ||
						!data.studyProgram ||
						!hasChanges(data.course, data.studyProgram)}
				>
					<ButtonIcon class="material-icons">save</ButtonIcon>
					<ButtonLabel>Save</ButtonLabel>
				</Button>
			</div>
		</form>
	</PaperContent>
</Paper>

<section id="sessions">
	<h2 class="mdc-typography--headline4">Lectures & exercises</h2>
	<DataTable
		sortable
		bind:sort
		bind:sortDirection
		on:SMUIDataTable:sorted={handleSort}
		table$aria-label="Lectures & exercises"
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
					<Label>Title</Label>
					<IconButton class="material-icons">arrow_upward</IconButton>
				</Cell>
				<Cell columnId="subtitle" style="width: 100%">
					<Label>Description</Label>
					<IconButton class="material-icons">arrow_upward</IconButton>
				</Cell>
				<Cell columnId="date">
					<Label>Date</Label>
					<IconButton class="material-icons">arrow_upward</IconButton>
				</Cell>
				<Cell columnId="image" sortable={false}>Image</Cell>
				<Cell columnId="edit" sortable={false}>Edit</Cell>
			</Row>
		</Head>
		<Body>
		{#each data.courseSessions as session (session.id)}
			<Row>
				<Cell numeric>{session.id}</Cell>
				<Cell>{session.title}</Cell>
				<Cell>
						<span class:empty={!session.subtitle}>
							{session.subtitle || 'none'}
						</span>
				</Cell>
				<Cell>
						<span class:empty={!session.date}>
							{dateFriendly(session.date)}
						</span>
				</Cell>
				<Cell>
					{#if session.image}
						<a
							class="icon-button image"
							href="{base}/img/sessions/{session.image}"
							title="Open session image"
							target="_blank"
						>
							<ButtonIcon class="material-icons">image</ButtonIcon>
						</a>
					{:else}
						<span class="empty">none</span>
					{/if}
				</Cell>
				<Cell>
					<a href="{base}/admin/sessions/{session.id}" class="icon-button">
						<ButtonIcon class="material-icons">edit</ButtonIcon>
					</a>
				</Cell>
			</Row>
		{/each}
		</Body>
	</DataTable>

	<div id="session-create-open">
		<Button
			variant="outlined"
			color="primary"
			class="btn-shaped-round"
			on:click={() => (sessionCreateOpen = true)}
		>
			<ButtonIcon class="material-icons">add</ButtonIcon>
			<ButtonLabel>New session</ButtonLabel>
		</Button>
	</div>
</section>

<Dialog
	id="session-create"
	bind:open={sessionCreateOpen}
	aria-labelledby="session-create-title"
	aria-describedby="session-create-content"
>
	<Title id="session-create-title">Add new session</Title>
	<Content id="session-create-content">
		<form id="new-session" method="POST" action="?/session">
			<div class="form-group">
				<Textfield
					use={[InitialFocus]}
					input$name="title"
					input$minlength={3}
					input$placeholder="Lecture 1, Exercise 2,..."
					label="Title"
					style="width: 100%;"
					helperLine$style="width: 100%;"
					bind:value={newSessionTitle}
					required
					invalid={form?.missing?.includes('sessionTitle')}
				>
					<TextfieldIcon slot="leadingIcon" class="material-icons">title</TextfieldIcon>
				</Textfield>
			</div>
		</form>
	</Content>
	<Actions>
		<Button defaultAction type="reset" form="new-session" action="close">
			<ButtonLabel>Cancel</ButtonLabel>
		</Button>
		<Button
			class="btn-success"
			type="submit"
			form="new-session"
			accesskey="s"
			disabled={!newSessionTitle}
		>
			<ButtonIcon class="material-icons">library_add</ButtonIcon>
			<ButtonLabel>Add</ButtonLabel>
		</Button>
	</Actions>
</Dialog>

<Snackbar bind:this={snackbarSuccess} class="success">
	<SnackbarLabel>Course has been created successfully.</SnackbarLabel>
	<SnackbarActions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</SnackbarActions>
</Snackbar>

<Snackbar bind:this={snackbarError} labelText={String(form?.error)} class="danger">
	<SnackbarLabel>Course could not be created!</SnackbarLabel>
	<SnackbarActions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</SnackbarActions>
</Snackbar>

<style>
    #session-create-open {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }

    form {
        padding: 1rem;
        min-width: 20vw;
    }

    form .fields,
    form .actions {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-content: center;
        gap: 2rem;
    }

    form .actions {
        justify-content: flex-start;
        margin-top: 2rem;
    }

    .form-group {
        flex-grow: 1;
        flex-basis: 40%;
    }

    #new-studyprogram-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 0.5rem;
    }

    .icon-button {
        color: var(--mdc-theme-primary);
    }

    .icon-button.image {
        color: var(--mdc-theme-text-secondary-on-background);
    }

    .empty {
        color: var(--mdc-theme-text-secondary-on-background);
        font-style: italic;
    }
</style>
