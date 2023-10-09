import type {RequestEvent} from "@sveltejs/kit";
import {json, error, HttpError_1} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sql = 'SELECT Id as id, ExampleId as exampleId, SourceTypeId as typeId, Title as title, Code as code, Priority as priority FROM `sources` WHERE ExampleId = ?';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
    try {
        const exampleId = url.searchParams.get('example');
        if(!exampleId){
            throw error(400, {
                message: `Missing example parameter`
            });
        }
        const [rows] = await locals.db.execute(sql, [exampleId]);
        return json(rows);
    }
    catch(e){
        console.error(e);
        if(HttpError_1 && e instanceof HttpError_1)
            throw e;

        throw error(500);
    }
};