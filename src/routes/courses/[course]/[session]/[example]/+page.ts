import type {PageLoad, PageLoadEvent, PageData} from "./$types";
import {error} from "@sveltejs/kit";
import {api} from "$lib/api/factory";
import {ExampleApi, ResponseError, SessionApi, SourceApi} from "$lib/api";
import type {SvelteComponent} from "svelte";

export const load: PageLoad = async ({ params, fetch }: PageLoadEvent): Promise<PageData> => {
    const sessionId = Number(params.session);
    const exampleId = Number(params.example);
    if(!sessionId || !exampleId)
        throw error(400, `Invalid session id ${sessionId} and/or example id ${exampleId}`);

    const sessionApi = api(SessionApi, fetch);
    const exampleApi = api(ExampleApi, fetch);
    const sourceApi = api(SourceApi, fetch);

    try {
        const session = await sessionApi.getSessionById(sessionId);
        const example = await exampleApi.getExampleById(exampleId);
        const sources = await sourceApi.getSourcesByExample(exampleId);
        let component: (typeof SvelteComponent) | undefined = undefined;
        if(example.component)
            component = (await import(`../../../../../lib/components/showcase/examples/${example.component}.svelte`))?.default;

        return {session, example, component, sources};
    }
    catch (e){
        console.error(e);
        if(e instanceof ResponseError)
            throw error(e.response.status, e.response.statusText);

        throw error(500);
    }
}