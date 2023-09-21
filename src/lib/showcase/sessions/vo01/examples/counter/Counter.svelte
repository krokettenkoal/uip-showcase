<script lang="ts">
    let counter: number = 0;
</script>

<button on:click={() => counter = Math.max(0, counter - 1)}>-</button>
<span>{counter}</span>
<button on:click={() => counter++}>+</button>