<script lang="ts">
    import {Label, Icon} from "@smui/button";
    import Hero, {Actions, Button, Content, Title} from "$lib/components/hero";
</script>

<Hero>
    <Title>UAS Showcase</Title>
    <Content>
        Code examples covered in lectures and exercises from various courses at St. Pölten UAS.
    </Content>
    <Actions>
        <Button href="/courses">
            <Label>Go to courses</Label>
            <Icon class="material-icons">arrow_forward</Icon>
        </Button>
    </Actions>
</Hero>