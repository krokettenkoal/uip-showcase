import {PUBLIC_REPO_OWNER, PUBLIC_REPO_NAME} from "$env/static/public";
import type {PageLoad, PageLoadEvent, PageData} from "./$types";

export const load: PageLoad = async ({fetch, params, parent}: PageLoadEvent): Promise<PageData> => {
    const {authSession} = await parent();
    return {authSession, repoOwner: PUBLIC_REPO_OWNER, repoName: PUBLIC_REPO_NAME};
}