import type {RequestEvent} from "@sveltejs/kit";
import {json, error} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sql = 'SELECT Id as id, ExampleId as exampleId, SourceTypeId as typeId, Title as title, Code as code, Priority as priority FROM `sources` WHERE ExampleId = ?';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
    const exampleId = url.searchParams.get('example');
    if(!exampleId){
        throw error(400, {
            message: `Missing example parameter`
        });
    }
    const [rows] = await locals.db.execute(sql, [exampleId]);
    return json(rows);
};