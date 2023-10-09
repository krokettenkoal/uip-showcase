import type {RequestEvent} from "@sveltejs/kit";
import {json, error, HttpError_1} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sql = 'SELECT Id as id, SessionId as sessionId, Title as title, Subtitle as subtitle, Image as image, Icon as icon, Component as component FROM `examples` WHERE Id = ?';

export const GET: RequestHandler = async ({ params, locals }: RequestEvent) => {
    try {
        const [rows] = await locals.db.execute(sql, [params.id]);
        if(!Array.isArray(rows) || rows.length === 0){
            throw error(404, {
                message: `Example with id ${params.id} not found`
            });
        }
        return json(rows[0]);
    }
    catch(e){
        console.error(e);
        if(HttpError_1 && e instanceof HttpError_1)
            throw e;

        throw error(500);
    }
};