import type { FetchAPI } from '$lib/api';
import { PUBLIC_REPO_OWNER, PUBLIC_REPO_NAME } from '$env/static/public';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from '$env/static/private';
import { dev } from '$app/environment';

/**
 * Checks if the given username is a collaborator on the public repo
 * @param username The username to check
 * @param token The token to use for authorization (only needed for client-side checks)
 * @param fetchFn The fetch function to use
 * @returns A promise that resolves to true if the user is a collaborator, false otherwise
 * @remarks When providing SvelteKit's fetch function, the token is automatically added to the request and does not need to be provided
 */
export const isCollaborator = async (
	username?: string,
	token?: string,
	fetchFn: FetchAPI = fetch
): Promise<boolean> => {
	if (!username) return false;

	let init: RequestInit | undefined = undefined;
	if (token) {
		init = {
			headers: {
				Authorization: `Bearer ${token}`,
				'User-Agent': 'authjs'
			}
		};
	}

	const res = await fetchFn(
		`https://api.github.com/repos/${PUBLIC_REPO_OWNER}/${PUBLIC_REPO_NAME}/collaborators/${username}`,
		init
	);
	return res.ok;
};

/**
 * Creates a new middleware Handle that provides supported authentication mechanisms
 * @remarks Currently, only GitHub is supported.
 */
export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		})
	],
	secret: AUTH_SECRET,
	trustHost: true,
	useSecureCookies: !dev,
	callbacks: {
		async signIn({ profile, account }) {
			return await isCollaborator(String(profile?.login), account?.access_token);
		},
		async jwt({ token, profile }) {
			if (token && profile) {
				if (profile.login) token.login = profile.login;
				if (profile.html_url) token.html_url = profile.html_url;
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user && token) {
				session.user.login = String(token.login);
				session.user.profileUrl = String(token.html_url);
			}

			return session;
		}
	}
});
