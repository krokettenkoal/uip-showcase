import type {Handle} from '@sveltejs/kit';
import {conn} from "$lib/server/db";
import {sequence} from "@sveltejs/kit/hooks";
import GitHub from "@auth/core/providers/github";
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import {SvelteKitAuth} from "@auth/sveltekit";
import {redirect} from "@sveltejs/kit";
import {isCollaborator} from "$lib/auth";

const restricted = /^\/admin\/\w+/i;

/**
 * Connect to the database and store the connection in the event locals
 * @param event The request event of the current request
 * @param resolve The next function in the hook chain
 */
const connectToDatabase: Handle = async ({event, resolve}) => {
    event.locals.db = conn;
    return resolve(event);
}

/**
 * Creates a new middleware Handle that provides supported authentication mechanisms
 * @remarks Currently, only GitHub is supported.
 */
const initializeAuth = SvelteKitAuth({
    providers: [
        GitHub({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ profile, account }) {
            return await isCollaborator(profile?.login as string, account?.access_token);
        },
        async jwt({token, profile}){
            if(token && profile) {
                if(profile.login)
                    token.login = profile.login;
                if(profile.html_url)
                    token.html_url = profile.html_url;
            }

            return token;
        },
        async session({session, token}){
            if(session.user && token) {
                session.user.login = token.login as string;
                session.user.profileUrl = token.html_url as string;
            }

            return session;
        }
    }
});

/**
 * Middleware to authorize users on `/admin` routes
 * @param event The request event of the current request
 * @param resolve The next function in the hook chain
 * @remarks Additional authorization is done in the layout server load hook
 */
const authorizeAdmin: Handle = async ({ event, resolve }) => {
    if (restricted.test(event.url.pathname)) {
        const session = await event.locals.getSession();
        if (!session) {
            throw redirect(303, "/admin");
        }
    }

    return resolve(event);
}

export const handle = sequence(connectToDatabase, initializeAuth, authorizeAdmin);