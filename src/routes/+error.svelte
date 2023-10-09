<script>
    import {page} from "$app/stores";
    import {Icon, Label} from "@smui/button";
    import Hero, {Actions, Button, Title, Content} from "$lib/components/hero";
    import {base} from "$app/paths";
    import {dev} from "$app/environment";
</script>

<Hero>
    <Title>Oops, something went wrong!</Title>
    <Content>
        {#if dev}
            {$page.error?.message}
        {:else}
            🥲
        {/if}
    </Content>
    <Actions>
        <Button href="{base}/">
            <Icon class="material-icons">arrow_back</Icon>
            <Label>Back to Home</Label>
        </Button>
    </Actions>
</Hero>