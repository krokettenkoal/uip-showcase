import type { RequestEvent } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ResponseError } from '$lib/api';

const sql =
	'SELECT Id as id, SessionId as sessionId, Title as title, Subtitle as subtitle, Image as image, Icon as icon, Component as component FROM `examples` WHERE SessionId = ?';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
	try {
		const sessionId = url.searchParams.get('session');
		if (!sessionId) {
			throw error(400, {
				message: `Missing session parameter`
			});
		}
		const [rows] = await locals.db.execute(sql, [sessionId]);
		return json(rows);
	} catch (e) {
		console.error(e);
		if (e instanceof ResponseError) throw error(e.response.status, e.response.statusText);

		throw error(500);
	}
};
