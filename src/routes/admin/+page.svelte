<script lang="ts">
    import { signIn, signOut } from "@auth/sveltekit/client";
    import {Label, Icon} from "@smui/button";
    import Hero, {Actions, Content, Title, Button} from "$lib/components/hero";
    import Fa from "svelte-fa";
    import {faGithub} from "@fortawesome/free-brands-svg-icons";
    import type {Session} from "@auth/core/types";

    export let data: {authSession?: Session, repoOwner: string, repoName: string};

    function getAvatarStyle(session: Session){
        if(session.user?.image){
            return `--avatar: url('${session.user.image}')`;
        }

        return '';
    }
</script>

<Hero>
    <Title>Administration</Title>
    <Content>
        {#if data.authSession}
            <span class="avatar" style={getAvatarStyle(data.authSession)} />
            <small>Signed in as</small>
            <a href={data.authSession.user.profileUrl} target="_blank"><strong>{data.authSession.user?.name ?? "User"}</strong></a>
        {:else}
            You need to be a collaborator on the <a href="https://github.com/{data.repoOwner}/{data.repoName}" target="_blank">project repository</a> to access the admin panel.
        {/if}
    </Content>
    <Actions>
        {#if data.authSession}
            <Button on:click={() => signOut()}>
                <Icon class="material-icons">logout</Icon>
                <Label>Sign Out</Label>
            </Button>
        {:else}
            <Button on:click={() => signIn("github")}>
                <Icon><Fa icon={faGithub} /></Icon>
                <Label>Sign In with GitHub</Label>
            </Button>
        {/if}
    </Actions>
</Hero>

<style>
    .avatar {
        --avatar: url('https://images.placeholders.dev/?width=128&height=128&text=%3F');
        background-image: var(--avatar);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        margin-right: 0.5rem;
        display: inline-block;
    }

    a {
        color: var(--mdc-theme-on-surface);
        text-decoration: none;
        border-bottom: 2px solid var(--mdc-theme-on-surface);
        opacity: .7;
        transition: opacity .1s ease-in-out
    }

    a:hover {
        opacity: 1;
    }
</style>