import type {RequestEvent} from "@sveltejs/kit";
import {json, error} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sql = 'SELECT Id as id, StudyProgramId as studyProgramId, Title as title, Subtitle as subtitle, MoodleUrl as moodleUrl FROM `courses`';

export const GET: RequestHandler = async ({ locals }: RequestEvent) => {
    try {
        const [rows] = await locals.db.query(sql);
        return json(rows);
    }
    catch(e){
        console.error(e);
        throw error(500);
    }
};