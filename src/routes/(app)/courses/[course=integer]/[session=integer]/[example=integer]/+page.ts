import { error } from '@sveltejs/kit';
import { api } from '$lib/api/factory';
import { ExampleApi, ResponseError, SourceApi } from '$lib/api';
import type { ComponentType } from 'svelte';

export const load = async ({ params, fetch }) => {
	const sessionId = Number(params.session);
	const exampleId = Number(params.example);
	if (!sessionId || !exampleId)
		throw error(400, `Invalid session id ${sessionId} and/or example id ${exampleId}`);

	const exampleApi = api(ExampleApi, fetch);
	const sourceApi = api(SourceApi, fetch);

	try {
		const example = await exampleApi.getExampleById(exampleId);
		const sources = await sourceApi.getSourcesByExample(exampleId);
		let component: ComponentType | undefined = undefined;
		if (example.component)
			component = (
				await import(
					`../../../../../../lib/components/showcase/examples/${example.component}.svelte`
					)
			)?.default;

		return {
			example,
			component,
			sources
		};
	} catch (e) {
		console.error(e);
		if (e instanceof ResponseError) throw error(e.response.status, e.response.statusText);

		throw error(500);
	}
};
