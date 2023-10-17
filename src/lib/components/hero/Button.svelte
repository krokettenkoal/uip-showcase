<script>
    import Button from "@smui/button";
</script>

<Button {...$$restProps} class="hero-btn {$$restProps.class ?? ''}" on:click>
    <slot />
</Button>

<style>
    :global(.hero-btn){
        color: var(--mdc-theme-on-surface) !important;
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;
    }
</style>