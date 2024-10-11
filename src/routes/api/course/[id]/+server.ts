import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ResultSetHeader } from 'mysql2';

const querySql =
	'SELECT Id as id, StudyProgramId as studyProgramId, Title as title, Subtitle as subtitle, MoodleUrl as moodleUrl FROM `courses` WHERE Id = ?';
const updateSql =
	'UPDATE `courses` SET StudyProgramId = ?, Title = ?, Subtitle = ?, MoodleUrl = ? WHERE Id = ?';

export const GET: RequestHandler = async ({ params, locals }: RequestEvent) => {
	const [rows] = await locals.db.execute(querySql, [params.id]);
	if (!Array.isArray(rows) || rows.length === 0) {
		throw error(404, {
			message: `Course with id ${params.id} not found`
		});
	}
	return json(rows[0]);
};

export const PUT: RequestHandler = async ({ params, locals, request }: RequestEvent) => {
	const id = Number(params.id);
	const data = await request.json();
	if (!id || !data.studyProgramId || !data.title) {
		const missing = [
			!id && 'id',
			!data.studyProgramId && 'studyProgramId',
			!data.title && 'title'
		].filter(Boolean) as string[];
		throw error(400, 'Missing required field(s): ' + missing.join(', '));
	}
	const [result] = await locals.db.execute<ResultSetHeader>(updateSql, [
		data.studyProgramId,
		data.title,
		data.subtitle ?? null,
		data.moodleUrl ?? null,
		id
	]);
	if (result.affectedRows === 0) {
		throw error(404, {
			message: `Course with id ${id} not found`
		});
	}

	return new Response(null);
};
