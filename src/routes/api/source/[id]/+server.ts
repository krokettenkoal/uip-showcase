import type {RequestEvent} from "@sveltejs/kit";
import {json, error} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const sql = 'SELECT Id as id, ExampleId as exampleId, SourceTypeId as typeId, Title as title, Code as code FROM `sources` WHERE Id = ?';

export const GET: RequestHandler = async ({ params, locals }: RequestEvent) => {
    const [rows] = await locals.db.execute(sql, [params.id]);
    if(!Array.isArray(rows) || rows.length === 0){
        throw error(404, {
            message: `Source code with id ${params.id} not found`
        });
    }
    return json(rows[0]);
};