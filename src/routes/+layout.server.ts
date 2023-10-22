import type { LayoutServerLoad, LayoutServerLoadEvent, LayoutServerData } from "./$types"
import {error} from "@sveltejs/kit";
import {api, studyProgramCache} from "$lib/api/factory";
import {CourseApi, ResponseError, SessionApi, StudyprogramApi} from "$lib/api";
import {PUBLIC_REPO_OWNER, PUBLIC_REPO_NAME} from "$env/static/public";

export const load: LayoutServerLoad = async ({locals, fetch}: LayoutServerLoadEvent): Promise<LayoutServerData> => {
    const studyProgramApi = api(StudyprogramApi, fetch);
    const courseApi = api(CourseApi, fetch);
    const sessionApi = api(SessionApi, fetch);
    try {
        const authSession = await locals.getSession();
        const studyPrograms = await studyProgramApi.getStudyPrograms();
        studyProgramCache.add(...studyPrograms);
        const courses = await courseApi.getCourses();
        const sessions = await Promise.all(courses.map(c => sessionApi.getSessionsByCourse(c.id)));
        return {
            authSession,
            studyPrograms,
            courses,
            sessions,
            repoOwner: PUBLIC_REPO_OWNER,
            repoName: PUBLIC_REPO_NAME
        };
    } catch (e){
        console.error(e);
        if(e instanceof ResponseError)
            throw error(e.response.status, e.response.statusText);

        throw error(500);
    }
}