<p class="mdc-typography--subtitle1" {...$$restProps}>
    <slot />
</p>

<style>
    p {
        color: var(--mdc-theme-text-secondary-on-background);
        text-align: center;
        animation: fade-in 700ms ease-out 200ms 1 both;
    }
</style>