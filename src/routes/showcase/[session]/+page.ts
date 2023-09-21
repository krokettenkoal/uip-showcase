import type {PageLoad, PageLoadEvent} from "./$types";
import type {ShowcaseSession} from "$lib/showcase/showcase";
import {loadSession} from "$lib/showcase/showcase";
import {error} from "@sveltejs/kit";

export const load: PageLoad = async ({ params }: PageLoadEvent): Promise<ShowcaseSession> => {
    const data = await loadSession(params.session);
    if(data)
        return data;

    throw error(404);
}