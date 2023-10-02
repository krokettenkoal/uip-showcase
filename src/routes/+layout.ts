import type {LayoutData, LayoutLoad, LayoutLoadEvent} from "./$types";
import {CourseApi, SessionApi, StudyprogramApi} from "$lib/api";
import {api, studyProgramCache} from "$lib/api/factory";
import {error} from "@sveltejs/kit";
export const prerender = true;

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
    } catch (e: any){
        throw error(e.response?.status ?? 500, {
            message: e.message,
            response: e.response
        });
    }
}