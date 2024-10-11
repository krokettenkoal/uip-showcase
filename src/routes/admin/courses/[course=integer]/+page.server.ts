import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import type { BaseCourse, BaseSession, Course, StudyProgram } from '$lib/api';
import { CourseApi, ResponseError, SessionApi } from '$lib/api';
import { api } from '$lib/api/factory';

export const load = async ({ params, parent, }) => {
	const courseId = Number(params.course);
	const { authSession, courses, allSessions, studyPrograms } = await parent();
	const courseIdx = courses.findIndex((c: Course) => c.id === courseId);
	if (courseIdx === -1) throw error(404, 'Course not found');

	return {
		authSession,
		allSessions,
		studyPrograms,
		course: courses[courseIdx],
		courseSessions: allSessions[courseIdx],
		studyProgram: studyPrograms.find(
			(sp: StudyProgram) => sp.id === courses[courseIdx].studyProgramId
		)
	};
};

export const actions = {
	update: async ({ request, fetch, params }) => {
		const data = await request.formData();
		const id = Number(params.course);
		const title = data.get('title');
		const subtitle = data.get('subtitle') || null;
		const studyProgramId = data.get('studyProgramId');
		const moodleUrl = data.get('moodleUrl') || null;
		const payload: BaseCourse = {
			title: String(title).trim(),
			studyProgramId: Number(studyProgramId),
			subtitle: (subtitle as string)?.trim(),
			moodleUrl: encodeURI((moodleUrl as string).trim())
		};

		if (!title || !studyProgramId) {
			const missing = [!title && 'title', !studyProgramId && 'studyProgramId'].filter(
				Boolean
			) as string[];
			return fail(400, {
				data: payload,
				missing
			});
		}

		const courseApi = api(CourseApi, fetch);

		try {
			await courseApi.updateCourse(id, payload);
			return {
				success: true
			};
		} catch (e) {
			if (e instanceof ResponseError) {
				return fail(e.response.status, { error: e.message });
			}

			return fail(500, { error: e });
		}
	},
	session: async ({ request, fetch, params }) => {
		const data = await request.formData();
		const courseId = Number(params.course);
		const title = data.get('title');
		const payload: BaseSession = { courseId, title: String(title).trim() };

		if (!title) {
			return fail(400, {
				data: payload,
				missing: ['sessionTitle']
			});
		}

		const sessionApi = api(SessionApi, fetch);

		try {
			await sessionApi.createSession(payload);
			return {
				success: true
			};
		} catch (e) {
			if (e instanceof ResponseError) {
				return fail(e.response.status, { error: e.message });
			}

			return fail(500, { error: String(e) });
		}
	}
} satisfies Actions;
