import type {LayoutData, LayoutLoad, LayoutLoadEvent} from "./$types";
import {loadSessions} from "$lib/showcase/showcase";

export const load: LayoutLoad = async ({}: LayoutLoadEvent): Promise<LayoutData> => {
    // Load all modules found inside showcase components folder
    const sessions = await loadSessions();
    return {sessions};
}