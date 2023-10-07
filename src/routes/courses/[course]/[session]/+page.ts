import type {PageLoad, PageLoadEvent, PageData} from "./$types";
import {error} from "@sveltejs/kit";
import {api} from "$lib/api/factory";
import {CourseApi, ExampleApi, SessionApi, SourcetypeApi} from "$lib/api";

export const load: PageLoad = async ({ params }: PageLoadEvent): Promise<PageData> => {
    const courseApi = api(CourseApi, fetch);
    const sessionApi = api(SessionApi, fetch);
    const exampleApi = api(ExampleApi, fetch);
    const courseId = Number(params.course);
    const sessionId = Number(params.session);
    if(!courseId || !sessionId)
        throw error(404);

    const course = await courseApi.getCourseById(courseId);
    const session = await sessionApi.getSessionById(sessionId);
    if(!course || !session)
        throw error(404);

    const examples = exampleApi.getExamplesBySession(sessionId);
    return {course, session, examples};
}