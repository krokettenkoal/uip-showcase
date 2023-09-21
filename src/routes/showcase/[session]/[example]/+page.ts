import type {PageLoad, PageLoadEvent} from "./$types";
import type {ShowcaseExample, ShowcaseSession} from "$lib/showcase/showcase";
import {loadSession} from "$lib/showcase/showcase";
import {error} from "@sveltejs/kit";

export const load: PageLoad = async ({ params }: PageLoadEvent): Promise<{ session: ShowcaseSession, example: ShowcaseExample }> => {
    const session = await loadSession(params.session);
    const example = session?.examples.find(e => e.id === params.example);

    if(session && example) {
        return { session, example };
    }

    throw error(404);
}