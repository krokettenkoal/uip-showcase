<script>
    import {page} from "$app/stores";
    import {Icon, Label} from "@smui/button";
    import Hero, {Actions, Button, Title} from "$lib/components/hero";
    import {base} from "$app/paths";
</script>

<Hero>
    <Title>{$page.error?.response?.statusText ?? $page.error?.message}</Title>
    <Actions>
        <Button href="{base}/">
            <Icon class="material-icons">arrow_back</Icon>
            <Label>Back to Home</Label>
        </Button>
    </Actions>
</Hero>