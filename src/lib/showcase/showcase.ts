import type {SvelteComponent} from "svelte";
import type {LanguageType} from "svelte-highlight/languages";
import type {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import type {CustomIconDefinition} from "$lib/custom-icons";

/**
 * @deprecated
 */
export interface ExampleSource {
    title: string;
    code: string;
    icon?: IconDefinition|CustomIconDefinition;
    language?: LanguageType<string>;
}

/**
 * @deprecated
 */
export interface ShowcaseExample {
    id: string;
    title: string;
    subtitle?: string;
    icon?: string;
    image?: string;
    component: typeof SvelteComponent;
    src: ExampleSource[];
    props?: any;
}

/**
 * @deprecated
 */
export interface ShowcaseSession {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    examples: ShowcaseExample[];
}

/**
 * Loads all showcase sessions, including their examples.
 * @deprecated
 */
export const loadSessions = async (): Promise<ShowcaseSession[]> => {
    return (await Promise.all(Object.values(import.meta.glob("./sessions/*/index.ts")).map(i => i()))).map((e: any) => e.default as ShowcaseSession);
}

/**
 * Loads a single showcase session by its id.
 * @param session
 * @deprecated
 */
export const loadSession = async (session: string): Promise<ShowcaseSession|null> => {
    try {
        const data = await import(`./sessions/${session}/index.ts`);
        return data.default;
    }
    catch {
        return null;
    }
}

/**
 *
 * @param session
 * @param example
 * @deprecated
 */
export const loadExample = async (session: string, example: string): Promise<ShowcaseExample|null> => {
    try {
        const data = await import(`./sessions/${session}/examples/${example}/index.ts`);
        return data.default;
    }
    catch {
        return null;
    }
}