import type {PageData, PageLoad, PageLoadEvent} from "./$types";
import {CourseApi, ResponseError, SessionApi} from "$lib/api";
import {api, getStudyProgram} from "$lib/api/factory";
import {error, HttpError_1} from "@sveltejs/kit";

export const load: PageLoad = async ({fetch, params}: PageLoadEvent): Promise<PageData> => {
    const courseApi = api(CourseApi, fetch);
    const sessionApi = api(SessionApi, fetch);
    const courseId = Number(params.course);
    if(!courseId)
        throw error(400, `Invalid course id ${params.course}`);

    try {
        const course = await courseApi.getCourseById(courseId);
        const studyProgram = await getStudyProgram(course.studyProgramId, fetch);
        const sessions = await sessionApi.getSessionsByCourse(courseId);
        return {course, sessions, studyProgram};
    }
    catch(e){
        console.error(e);
        if(e instanceof ResponseError)
            throw error(e.response.status, e.response.statusText);

        throw error(500);
    }

}