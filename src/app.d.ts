// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {Pool} from "mysql2/promise";
import type {DefaultSession} from "@auth/core/types";

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

declare module '@auth/core/types' {
	interface Session {
		user: {
			login: string;
			profileUrl: string;
		} & DefaultSession['user'];
	}
}

declare module '@fortawesome/free-brands-svg-icons/index.es' {
	export * from '@fortawesome/free-brands-svg-icons';
}

export {};
