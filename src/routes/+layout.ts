import type {LayoutData, LayoutLoad, LayoutLoadEvent} from "./$types";
import {CourseApi, ResponseError, SessionApi, StudyprogramApi} from "$lib/api";
import {api, studyProgramCache} from "$lib/api/factory";
import {error} from "@sveltejs/kit";

export const load: LayoutLoad = async ({fetch}: LayoutLoadEvent): Promise<LayoutData> => {
    const studyProgramApi = api(StudyprogramApi, fetch);
    const courseApi = api(CourseApi, fetch);
    const sessionApi = api(SessionApi, fetch);
    try {
        const studyPrograms = await studyProgramApi.getStudyPrograms();
        studyProgramCache.add(...studyPrograms);
        const courses = await courseApi.getCourses();
        const sessions = await Promise.all(courses.map(c => sessionApi.getSessionsByCourse(c.id)));
        return {studyPrograms, courses, sessions};
    } catch (e){
        console.error(e);
        if(e instanceof ResponseError)
            throw error(e.response.status, e.response.statusText);

        throw error(500);
    }
}