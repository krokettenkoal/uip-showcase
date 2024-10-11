import type { Handle } from '@sveltejs/kit';
import { conn } from '$lib/server/db';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { handle as authHandle } from '$lib/auth';

const restricted = /^\/admin\/\w+/i;

/**
 * Connect to the database and store the connection in the event locals
 * @param event The request event of the current request
 * @param resolve The next function in the hook chain
 */
const connectToDatabase: Handle = async ({ event, resolve }) => {
	event.locals.db = conn;
	return resolve(event);
};

/**
 * Middleware to authorize users on `/admin` routes
 * @param event The request event of the current request
 * @param resolve The next function in the hook chain
 * @remarks Additional authorization is done in the layout server load hook
 */
const authorizeAdmin: Handle = async ({ event, resolve }) => {
	if (restricted.test(event.url.pathname)) {
		const session = await event.locals.auth();
		if (!session) {
			throw redirect(303, '/admin');
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(connectToDatabase, authHandle, authorizeAdmin);
