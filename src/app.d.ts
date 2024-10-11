// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Pool } from 'mysql2/promise';
import type { DefaultSession } from '@auth/core/types';
import {
	type IconName as FaIconName
} from '@fortawesome/fontawesome-common-types';
import type { IconName } from '@fortawesome/free-brands-svg-icons';

type CustomIconName = Exclude<string, IconName>;
type GlobalIconName = FaIconName | CustomIconName;

declare global {
	namespace App {
		interface Locals {
			db: Pool;
		}

		interface Error {
			message: string;
		}

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

declare module '@fortawesome/fontawesome-common-types' {
	export type IconName = GlobalIconName;
}

declare module '@fortawesome/free-brands-svg-icons' {
	export type IconName = GlobalIconName;
}

declare module '@fortawesome/free-brands-svg-icons/index.es' {
	export * from '@fortawesome/free-brands-svg-icons';
}

export {};
