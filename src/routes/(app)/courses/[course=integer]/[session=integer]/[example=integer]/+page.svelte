<script lang="ts">
	import Showcase from '$lib/components/showcase/Showcase.svelte';
	import { onDestroy } from 'svelte';
	import { title } from '$lib/stores/titleStore';
	import BackButton from '$lib/components/BackButton.svelte';
	import { base } from '$app/paths';

	export let data;
	$: $title = data.example.title;

	onDestroy(() => {
		$title = '';
	});
</script>

{#if data.session}
	<BackButton href="{base}/courses/{data.session.courseId}/{data.session.id}">
		{data.session.title}
	</BackButton>
{/if}
<Showcase example={data.example} component={data.component} sources={data.sources} />
