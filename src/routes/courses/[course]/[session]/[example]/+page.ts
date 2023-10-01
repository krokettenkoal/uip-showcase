import type {PageLoad, PageLoadEvent, PageData} from "./$types";
import {error} from "@sveltejs/kit";
import {api} from "$lib/api/factory";
import {ExampleApi, SessionApi, SourceApi} from "$lib/api";
import type {SvelteComponent} from "svelte";

export const load: PageLoad = async ({ params, fetch }: PageLoadEvent): Promise<PageData> => {
    const sessionApi = api(SessionApi, fetch);
    const exampleApi = api(ExampleApi, fetch);
    const sourceApi = api(SourceApi, fetch);
    const sessionId = Number(params.session);
    const exampleId = Number(params.example);
    if(!sessionId || !exampleId)
        throw error(404);

    const session = await sessionApi.getSessionById(sessionId);
    const example = await exampleApi.getExampleById(exampleId);
    const sources = await sourceApi.getSourcesByExample(exampleId);

    if(!session || !example)
        throw error(404);

    const component: typeof SvelteComponent = (await import(`/src/lib/components/showcase/${example.component}.svelte`)).default;
    return {session, example, component, sources};
}