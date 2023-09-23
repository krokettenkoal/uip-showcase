<script lang="ts">
    import Button, {Icon, Label} from "@smui/button/src/index.js";
    import {page} from "$app/stores";

    let parent: string;
    $: parent = $page.url.pathname.split("/").slice(0, -1).join("/") || '/';
</script>

<Button {...$$restProps} href={$$restProps.href ?? parent}>
    <Icon class="material-icons">arrow_back_ios</Icon>
    <Label><slot>Back</slot></Label>
</Button>