<script lang="ts">
    import type {ShowcaseSession, ShowcaseExample} from "$lib/showcase/showcase";
    import Card, {
        Content,
        Media,
        Actions,
        ActionButtons,
    } from '@smui/card';
    import Button, {Icon, Label} from '@smui/button';

    export let session: ShowcaseSession;
    export let example: ShowcaseExample;
</script>

<Card class="example">
    <Media class="card-media-16x9" aspectRatio="16x9" style="background-image:url(/img/examples/{example.image || 'placeholder.jpg'})" />
    <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {example.title}
        </h2>
        {#if example.subtitle}
            <h3 class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
                {example.subtitle}
            </h3>
        {/if}
    </Content>
    <Actions>
        <ActionButtons>
            <Button href="/showcase/{session.id}/{example.id}">
                <Label>View example</Label>
                <Icon class="material-icons">arrow_forward</Icon>
            </Button>
        </ActionButtons>
    </Actions>
</Card>

<style>
    :global(.example) {
        min-width: 20rem;
    }
</style>