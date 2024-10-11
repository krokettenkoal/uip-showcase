import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ResultSetHeader } from 'mysql2';
import type { Course } from '$lib/api';

const querySql =
	'SELECT Id as id, StudyProgramId as studyProgramId, Title as title, Subtitle as subtitle, MoodleUrl as moodleUrl FROM `courses`';
const insertSql =
	'INSERT INTO `courses` (StudyProgramId, Title, Subtitle, MoodleUrl) VALUES (?, ?, ?, ?)';

export const GET: RequestHandler = async ({ locals }: RequestEvent) => {
	const [rows] = await locals.db.query(querySql);
	return json(rows);
};

export const POST: RequestHandler = async ({ params, locals, request }: RequestEvent) => {
	const data = await request.json();
	if (!data.studyProgramId || !data.title) {
		const missing = [data.studyProgramId && 'studyProgramId', data.title && 'title'].filter(
			Boolean
		) as string[];
		throw error(400, 'Missing required field(s): ' + missing.join(', '));
	}
	const [result] = await locals.db.execute<ResultSetHeader>(insertSql, [
		data.studyProgramId,
		data.title,
		data.subtitle ?? null,
		data.moodleUrl ?? null
	]);
	const course = { id: result.insertId, ...data } satisfies Course;
	return json(course);
};
