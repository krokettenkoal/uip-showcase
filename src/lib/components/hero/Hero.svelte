<div {...$$restProps} class="hero">
	<div class="hero-content">
		<slot />
	</div>
</div>

<style>
	:global(body) {
		background-size: 200% 200%;
		-webkit-animation: hero-bg 30s ease infinite;
		-moz-animation: hero-bg 30s ease infinite;
		animation: hero-bg 30s ease infinite;
	}

	.hero {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 64px - 2rem);
		box-sizing: border-box;
	}
</style>
