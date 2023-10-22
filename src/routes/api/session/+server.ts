import type {RequestEvent} from "@sveltejs/kit";
import {json, error} from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type {ResultSetHeader} from "mysql2";
import type {Session} from "$lib/api";

const querySql = 'SELECT Id as id, CourseId as courseId, Title as title, Subtitle as subtitle, Image as image, Date as date FROM `sessions` WHERE CourseId = ?';
const insertSql = 'INSERT INTO `sessions` (CourseId, Title, Subtitle, Image) VALUES (?, ?, ?, ?)';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
    const courseId = url.searchParams.get('course');
    if(!courseId){
        throw error(400, {
            message: `Missing course parameter`
        });
    }
    const [rows] = await locals.db.execute(querySql, [courseId]);
    return json(rows);
};

export const POST: RequestHandler = async ({ params, locals, request }: RequestEvent) => {
    const data = await request.json();
    if(!data.courseId || !data.title){
        const missing = [data.courseId && 'courseId', data.title && 'title'].filter(Boolean) as string[];
        throw error(400, 'Missing required field(s): ' + missing.join(', '));
    }
    const [result] = await locals.db.execute<ResultSetHeader>(insertSql, [data.courseId, data.title, data.subtitle ?? null, data.image ?? null]);
    const course = {id: result.insertId, ...data} satisfies Session;
    return json(course);
}