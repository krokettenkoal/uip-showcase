import type {FetchAPI} from "$lib/api";
import {PUBLIC_REPO_OWNER, PUBLIC_REPO_NAME} from "$env/static/public";

/**
 * Checks if the given username is a collaborator on the public repo
 * @param username The username to check
 * @param token The token to use for authorization (only needed for client-side checks)
 * @param fetchFn The fetch function to use
 * @returns A promise that resolves to true if the user is a collaborator, false otherwise
 * @remarks When providing SvelteKit's fetch function, the token is automatically added to the request and does not need to be provided
 */
export const isCollaborator = async (username?: string, token?: string, fetchFn: FetchAPI = fetch): Promise<boolean> => {
    if(!username)
        return false;

    let init: RequestInit|undefined = undefined;
    if(token) {
        init = {
            headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "authjs",
            }
        }
    }

    const res = await fetch(`https://api.github.com/repos/${PUBLIC_REPO_OWNER}/${PUBLIC_REPO_NAME}/collaborators/${username}`, init);
    return res.ok;
}