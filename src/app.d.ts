// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {Pool} from "mysql2/promise";

declare global {
	namespace App {
		interface Locals {
			db: Pool;
		}
		// interface Error { message: string; }
		// interface PageData {}
		// interface Platform {}
	}
}

declare module '@fortawesome/free-brands-svg-icons/index.es' {
	export * from '@fortawesome/free-brands-svg-icons';
}

export {};
