<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";
    import Card, {
        Content,
        Media,
        Actions,
        ActionButtons,
    } from '@smui/card';
    import Button, {Icon, Label} from '@smui/button';

    export let session: ShowcaseSession;
</script>

<Card class="session">
    <Media class="card-media-16x9" aspectRatio="16x9" style="background-image:url(/img/sessions/{session.image || 'placeholder.jpg'})" />
    <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {session.title}
        </h2>
        {#if session.subtitle}
            <h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
                {session.subtitle}
            </h3>
        {/if}
        {session.description ?? ''}
    </Content>
    <Actions>
        <ActionButtons>
            <Button href="/showcase/{session.id}">
                <Label>View examples</Label>
                <Icon class="material-icons">arrow_forward</Icon>
            </Button>
        </ActionButtons>
    </Actions>
</Card>

<style>
    :global(.session) {
        min-width: 18rem;
        max-width: 20rem;
    }
</style>