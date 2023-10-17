<div class="actions" {...$$restProps}>
    <slot />
</div>

<style>
    .actions {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        animation: fade-in 900ms ease-out 400ms 1 both;
    }
    .actions :global(button){
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;
    }
</style>