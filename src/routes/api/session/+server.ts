import type {RequestEvent} from "@sveltejs/kit";
import {json, error, HttpError_1} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sql = 'SELECT Id as id, CourseId as courseId, Title as title, Subtitle as subtitle, Image as image, Date as date FROM `sessions` WHERE CourseId = ?';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
    try {
        const courseId = url.searchParams.get('course');
        if(!courseId){
            throw error(400, {
                message: `Missing course parameter`
            });
        }
        const [rows] = await locals.db.execute(sql, [courseId]);
        return json(rows);
    }
    catch(e){
        console.error(e);
        if(HttpError_1 && e instanceof HttpError_1)
            throw e;

        throw error(500);
    }
};