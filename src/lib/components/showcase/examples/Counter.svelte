<script lang="ts">
	import IconButton from '@smui/icon-button';

	let counter: number = 0;
</script>

<div class="counter">
	<IconButton on:click={() => (counter = Math.max(0, counter - 1))} class="material-icons"
		>remove</IconButton
	>
	<span class="counter-value">{counter}</span>
	<IconButton on:click={() => counter++} class="material-icons">add</IconButton>
</div>

<style>
	.counter {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.counter-value {
		font-size: 3rem;
		font-weight: bold;
	}
</style>
