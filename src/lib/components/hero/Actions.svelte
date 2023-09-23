<div class="actions" {...$$restProps}>
    <slot />
</div>

<style>
    .actions {
        display: flex;
        justify-content: space-evenly;
    }
    .actions :global(button){
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 1rem;
    }
</style>