import type {Handle} from '@sveltejs/kit';
import {conn} from "$lib/server/db";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.db = conn;
    return resolve(event);
}