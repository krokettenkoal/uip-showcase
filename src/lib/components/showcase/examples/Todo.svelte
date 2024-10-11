<script lang="ts">
	import IconButton from '@smui/icon-button';
	import TextField from '@smui/textfield';
	import List, { Item, Text } from '@smui/list';

	let todos: string[] = [],
		newTodo: string = '';
	function addTodo() {
		todos.push(newTodo);
		todos = todos;
		newTodo = '';
	}
</script>

<div class="todo-list">
	<List class="todos" nonInteractive>
		{#each todos as todo}
			<Item class="todo">
				<TextField bind:value={todo} />
			</Item>
		{:else}
			<Item>
				<Text>Nothing to do! 🥳</Text>
			</Item>
		{/each}
	</List>
	<div class="new-todo">
		<TextField type="text" bind:value={newTodo} class="todo" label="To-do" />
		<IconButton on:click={addTodo} class="material-icons">add</IconButton>
	</div>
</div>

<style>
	.new-todo {
		display: flex;
		align-items: center;
	}
</style>
