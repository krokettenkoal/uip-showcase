<script>
    import {Label, Icon} from "@smui/button";
    import Hero, {Actions, Button, Content, Title} from "$lib/components/hero";
</script>

<Hero>
    <Title>UIP Showcase</Title>
    <Content>
        All code examples covered in the User Interface Programming (UIP) lectures and exercises.<br />
        UIP is a course in the Media Technology bachelor program at St. Pölten UAS.
    </Content>
    <Actions>
        <Button href="/showcase">
            <Label>View examples</Label>
            <Icon class="material-icons">arrow_forward</Icon>
        </Button>
    </Actions>
</Hero>