import type * as runtime from "$lib/api/runtime";
import type {FetchAPI} from "$lib/api/runtime";
import {Configuration} from "$lib/api/runtime";
import {ModelCache} from "$lib/api/model-cache";
import type {SourceType, StudyProgram} from "$lib/api/models";
import {StudyprogramApi, SourcetypeApi} from "$lib/api";

export const sourceTypeCache: ModelCache<SourceType> = new ModelCache<SourceType>();
export const studyProgramCache: ModelCache<StudyProgram> = new ModelCache<StudyProgram>();

export function api<T extends runtime.BaseAPI>(cls: { new(cfg: Configuration): T ;}, fetchFn: FetchAPI): T {
    const cfg = new Configuration({fetchApi: fetchFn});
    return new cls(cfg);
}

export async function getSourceType(id: number, fetchFn: FetchAPI = fetch): Promise<SourceType> {
    if(sourceTypeCache.has(id))
        return sourceTypeCache.get(id)!;

    const sourceTypeApi = api(SourcetypeApi, fetchFn);
    const sourceType = await sourceTypeApi.getSourceTypeById(id);
    sourceTypeCache.add(sourceType);
    return sourceType;
}

export async function getStudyProgram(id: number, fetchFn: FetchAPI = fetch): Promise<StudyProgram> {
    if(studyProgramCache.has(id))
        return studyProgramCache.get(id)!;

    const studyProgramApi = api(StudyprogramApi, fetchFn);
    const studyProgram = await studyProgramApi.getStudyProgramById(id);
    studyProgramCache.add(studyProgram);
    return studyProgram;
}