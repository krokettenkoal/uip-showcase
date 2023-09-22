<script lang="ts">
    import type {ShowcaseSession} from "$lib/showcase/showcase";
    import Button, {Icon, Label} from "@smui/button";

    export let data: ShowcaseSession;
</script>

<Button href="/showcase">
    <Icon class="material-icons">arrow_back_ios</Icon>
    <Label>Back</Label>
</Button>
<h2>{data.title}</h2>
{data.examples.map(e => e.title).join(', ')}