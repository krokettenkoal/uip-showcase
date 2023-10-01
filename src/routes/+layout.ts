import type {LayoutData, LayoutLoad, LayoutLoadEvent} from "./$types";
import {CourseApi, SessionApi} from "$lib/api";
import {api} from "$lib/api/factory";
export const prerender = true;

export const load: LayoutLoad = async ({fetch}: LayoutLoadEvent): Promise<LayoutData> => {
    const courseApi = api(CourseApi, fetch);
    const sessionApi = api(SessionApi, fetch);
    const courses = await courseApi.getCourses();
    const sessions = await Promise.all(courses.map(c => sessionApi.getSessionsByCourse(c.id)));
    return {courses, sessions};
}