import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sql =
	'SELECT Id as id, SessionId as sessionId, Title as title, Subtitle as subtitle, Image as image, Icon as icon, Component as component FROM `examples` WHERE Id = ?';

export const GET: RequestHandler = async ({ params, locals }: RequestEvent) => {
	const [rows] = await locals.db.execute(sql, [params.id]);
	if (!Array.isArray(rows) || rows.length === 0) {
		throw error(404, {
			message: `Example with id ${params.id} not found`
		});
	}
	return json(rows[0]);
};
