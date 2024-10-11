import type * as runtime from '$lib/api/runtime';
import type { FetchAPI } from '$lib/api/runtime';
import { Configuration } from '$lib/api/runtime';
import { ModelCache } from '$lib/api/model-cache';
import type { SourceType, StudyProgram } from '$lib/api/models';
import { StudyprogramApi, SourcetypeApi } from '$lib/api';

/**
 * A cache for source types, automatically populated when using the `getSourceType` function
 */
export const sourceTypeCache: ModelCache<SourceType> = new ModelCache<SourceType>();
/**
 * A cache for study programs, automatically populated when using the `getStudyPrograms` and `getStudyProgram` functions
 */
export const studyProgramCache: ModelCache<StudyProgram> = new ModelCache<StudyProgram>();

/**
 * Initializes a new API client for the specified API type and assigns a `fetch` function to be used for requests
 * @param cls The API class to instantiate
 * @param fetchFn The fetch function to use for requests. Usually, this is the `fetch` function from the `@sveltejs/kit` package.
 * @remarks If you do not require the API client to use a custom `fetch` function, you can use the API client constructor directly.
 */
export function api<T extends runtime.BaseAPI>(
	cls: { new (cfg: Configuration): T },
	fetchFn: FetchAPI
): T {
	const cfg = new Configuration({ fetchApi: fetchFn });
	return new cls(cfg);
}

/**
 * Gets a source type by its ID. If the source type is already cached, the cached value is returned.
 * @param id The ID of the source type to get
 * @param fetchFn The fetch function to use for requests. Usually, this is the `fetch` function from the `@sveltejs/kit` package. Defaults to JavaScript's `fetch` function.
 * @remarks This function caches the source type in memory. If you need to refresh the source type, you can use the `sourceTypeCache` variable to clear the cache.
 */
export async function getSourceType(id: number, fetchFn: FetchAPI = fetch): Promise<SourceType> {
	if (sourceTypeCache.has(id)) return sourceTypeCache.get(id)!;

	const sourceTypeApi = api(SourcetypeApi, fetchFn);
	const sourceType = await sourceTypeApi.getSourceTypeById(id);
	sourceTypeCache.add(sourceType);
	return sourceType;
}

/**
 * Gets all study programs and adds them to the cache
 * @param fetchFn The fetch function to use for requests. Usually, this is the `fetch` function from the `@sveltejs/kit` package. Defaults to JavaScript's `fetch` function.
 * @remarks This function caches the study programs in memory, but does not read from the cache. If you need to read from the cache, you can use the `studyProgramCache` variable.
 */
export async function getStudyPrograms(fetchFn: FetchAPI = fetch): Promise<StudyProgram[]> {
	const studyProgramApi = api(StudyprogramApi, fetchFn);
	const studyPrograms = await studyProgramApi.getStudyPrograms();
	studyProgramCache.add(...studyPrograms);
	return studyPrograms;
}

/**
 * Gets a study program by its ID. If the study program is already cached, the cached value is returned.
 * @param id The ID of the study program to get
 * @param fetchFn The fetch function to use for requests. Usually, this is the `fetch` function from the `@sveltejs/kit` package. Defaults to JavaScript's `fetch` function.
 * @remarks This function caches the study program in memory. If you need to refresh the study program, you can use the `studyProgramCache` variable to clear the cache.
 */
export async function getStudyProgram(
	id: number,
	fetchFn: FetchAPI = fetch
): Promise<StudyProgram> {
	if (studyProgramCache.has(id)) return studyProgramCache.get(id)!;

	const studyProgramApi = api(StudyprogramApi, fetchFn);
	const studyProgram = await studyProgramApi.getStudyProgramById(id);
	studyProgramCache.add(studyProgram);
	return studyProgram;
}
