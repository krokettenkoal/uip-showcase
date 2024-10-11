<div class="cards">
	<slot />
</div>

<style>
	.cards {
		display: flex;
		flex-flow: row wrap;
		gap: 2rem;
	}

	.cards :global(> *) {
		--i: 0;
		--base-delay: 100ms;
		min-width: 20rem;
		max-width: 25rem;
		animation: fly-in-Y 500ms ease-in-out calc(var(--i) * var(--base-delay)) 1 both;
	}

	@media screen and (max-width: 768px) {
		.cards {
			flex-flow: column nowrap;
			align-items: stretch;
		}

		.cards :global(> *) {
			--fly-delay: 0ms;
			max-width: unset;
			animation: fly-in-X 500ms ease-in-out calc(var(--i) * var(--base-delay)) 1 both;
		}
	}
</style>
