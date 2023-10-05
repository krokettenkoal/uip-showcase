<script lang="ts">
    import Card, {
        Content,
        Media,
        Actions,
        ActionButtons,
    } from '@smui/card';
    import Button, {Icon, Label} from '@smui/button';
    import type {Session} from "$lib/api";
    import {base} from "$app/paths";

    export let session: Session;
    export let i: number = 0;
</script>

<Card {...$$restProps} style="--i:{i}">
    <Media class="card-media-16x9" aspectRatio="16x9" style="background-image:url(/img/sessions/{session.image || 'placeholder.jpg'})" />
    <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
            {session.title}
        </h2>
        {#if session.subtitle}
            <p class="mdc-typography--subtitle2" style="margin: 0 0 10px; color: #888;">
                {session.subtitle}
            </p>
        {/if}
    </Content>
    <Actions>
        <ActionButtons>
            <Button href="{base}/courses/{session.courseId}/{session.id}">
                <Label>View examples</Label>
                <Icon class="material-icons">arrow_forward</Icon>
            </Button>
        </ActionButtons>
    </Actions>
</Card>