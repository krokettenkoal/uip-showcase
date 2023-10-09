import type {PageLoad, PageLoadEvent, PageData} from "./$types";
import {error} from "@sveltejs/kit";
import {api} from "$lib/api/factory";
import {CourseApi, ExampleApi, ResponseError, SessionApi} from "$lib/api";

export const load: PageLoad = async ({ params, fetch }: PageLoadEvent): Promise<PageData> => {
    const courseId = Number(params.course);
    const sessionId = Number(params.session);
    if(!courseId || !sessionId)
        throw error(400, `Invalid course id ${courseId} and/or session id ${sessionId}`);

    const courseApi = api(CourseApi, fetch);
    const sessionApi = api(SessionApi, fetch);
    const exampleApi = api(ExampleApi, fetch);

    try {
        const course = await courseApi.getCourseById(courseId);
        const session = await sessionApi.getSessionById(sessionId);
        const examples = exampleApi.getExamplesBySession(sessionId);
        return {course, session, examples};
    }
    catch(e){
        console.error(e);
        if(e instanceof ResponseError)
            throw error(e.response.status, e.response.statusText);

        throw error(500);
    }
}