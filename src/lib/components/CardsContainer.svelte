<div class="cards">
    <slot />
</div>

<style>
    .cards {
        display: flex;
        flex-flow: row wrap;
        gap: 2rem;
    }

    @media screen and (max-width: 768px){
        .cards {
            flex-flow: column nowrap;
            align-items: stretch;
        }
    }
</style>