import type * as runtime from "$lib/api/runtime";
import type {FetchAPI} from "$lib/api/runtime";
import {Configuration} from "$lib/api/runtime";

export function api<T extends runtime.BaseAPI>(cls: { new(cfg: Configuration): T ;}, fetchFn: FetchAPI): T {
    const cfg = new Configuration({fetchApi: fetchFn});
    return new cls(cfg);
}