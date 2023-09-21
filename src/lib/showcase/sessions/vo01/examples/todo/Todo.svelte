<script lang="ts">
    let todos: string[] = [], newTodo: string = '';
    function addTodo(){
        todos.push(newTodo);
        todos = todos;
        newTodo = '';
    }
</script>

<ul>
    {#each todos as todo}
        <li>{todo}</li>
    {/each}
</ul>
<input type="text" bind:value={newTodo} />
<button on:click={addTodo}>Add</button>



