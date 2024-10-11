<script lang="ts">
	import type { Session } from '@auth/core/types';
	import { Label } from '@smui/common';
	import Button, { Icon } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import { Item } from '@smui/list';
	import Accordion, {
		Panel,
		Header as AccordionHeader,
		Content as AccordionContent
	} from '@smui-extra/accordion';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';

	export let session: Session | null | undefined = undefined;

	let panelOpen: boolean = false;

	function getAvatarStyle(s: Session): string {
		if (s.user.image) return `--avatar: url(${s.user.image})`;

		if (!s.user.name) return '';

		const initials = s.user.name
			.split(' ')
			.map((val) => val.substring(0, 1))
			.join('');
		return `--avatar: url(https://placehold.co/40x40?text=${initials})`;
	}
</script>

{#if session?.user}
	<Accordion>
		<Panel bind:open={panelOpen} variant="unelevated">
			<AccordionHeader>
				<p class="user">
					<span class="avatar" style={getAvatarStyle(session)} />
					<Label class="user-name">{session.user.name}</Label>
				</p>
				<IconButton slot="icon" toggle pressed={panelOpen}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</AccordionHeader>
			<AccordionContent>
				<Button on:click={() => signOut()} color="secondary">
					<Icon class="material-icons">logout</Icon>
					<Label>Sign Out</Label>
				</Button>
			</AccordionContent>
		</Panel>
	</Accordion>
{:else}
	<Item>
		<Button on:click={() => signIn('github')} color="secondary">
			<Icon>
				<Fa icon={faGithub} />
			</Icon>
			<Label>Sign In with GitHub</Label>
		</Button>
	</Item>
{/if}

<style>
    .user {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        column-gap: 1rem;
    }

    :global(.user-name) {
        font-size: 0.8rem;
        color: var(--mdc-theme-text-secondary-on-background);
    }

    :global(.avatar) {
        --avatar: url(https://placehold.co/40x40?text=FH);
        display: inline-block;
        background-image: var(--avatar);
        background-size: cover;
        background-position: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
</style>
