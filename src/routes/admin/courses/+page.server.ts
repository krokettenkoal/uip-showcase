import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { api } from '$lib/api/factory';
import type { BaseCourse } from '$lib/api';
import { CourseApi, ResponseError } from '$lib/api';

export const actions = {
	create: async ({ request, fetch }) => {
		const data = await request.formData();
		const title = data.get('title');
		const subtitle = data.get('subtitle') || null;
		const studyProgramId = data.get('studyProgramId');
		const moodleUrl = data.get('moodleUrl') || null;
		const payload: BaseCourse = {
			title: String(title).trim(),
			studyProgramId: Number(studyProgramId),
			subtitle: (subtitle as string).trim(),
			moodleUrl: encodeURI((moodleUrl as string).trim())
		};

		if (!title || !studyProgramId) {
			return fail(400, {
				data: payload,
				missing: [!title && 'title', !studyProgramId && 'studyProgramId']
			});
		}

		const courseApi = api(CourseApi, fetch);

		try {
			const course = await courseApi.createCourse(payload);
			return {
				success: true,
				course
			};
		} catch (e) {
			if (e instanceof ResponseError) {
				return fail(e.response.status, { error: { message: e.message } });
			}

			return fail(500, { error: e });
		}
	}
} satisfies Actions;
