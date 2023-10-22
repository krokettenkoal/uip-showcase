import type {RequestEvent} from "@sveltejs/kit";
import type { RequestHandler } from './$types';
import type {ResultSetHeader} from "mysql2";
import type { StudyProgram} from "$lib/api";
import {json, error} from '@sveltejs/kit';

const sql = 'SELECT Id as id, Title as title, Subtitle as subtitle FROM `studyprograms`';
const insertSql = 'INSERT INTO `studyprograms` (Title, Subtitle) VALUES (?, ?)';

export const GET: RequestHandler = async ({ locals }: RequestEvent) => {
    const [rows] = await locals.db.query(sql);
    return json(rows);
};

export const POST: RequestHandler = async ({ params, locals, request }: RequestEvent) => {
    const data = await request.json();
    if(!data.title){
        throw error(400, 'Missing required field: title');
    }
    const [result] = await locals.db.execute<ResultSetHeader>(insertSql, [data.title, data.subtitle ?? null]);
    const studyProgram = {id: result.insertId, ...data} satisfies StudyProgram;
    return json(studyProgram);
}