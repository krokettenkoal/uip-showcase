import type {PageData, PageLoad, PageLoadEvent} from "./$types";
import {CourseApi, SessionApi} from "$lib/api";
import {api, getStudyProgram} from "$lib/api/factory";
import {error} from "@sveltejs/kit";

export const ssr = false;

export const load: PageLoad = async ({fetch, params}: PageLoadEvent): Promise<PageData> => {
    const courseApi = api(CourseApi, fetch);
    const sessionApi = api(SessionApi, fetch);
    const courseId = Number(params.course);
    if(!courseId)
        throw error(404);

    const course = await courseApi.getCourseById(courseId);
    if(!course)
        throw error(404);

    try {
        const studyProgram = await getStudyProgram(course.studyProgramId, fetch);
        const sessions = await sessionApi.getSessionsByCourse(courseId);
        return {course, sessions, studyProgram};
    }
    catch(e: any){
        console.error(e);
        throw error(e.response?.status ?? 500, {
            message: e.message,
            response: e.response
        });
    }

}