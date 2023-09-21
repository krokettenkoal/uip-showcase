<script lang="ts">
    import Fab from "@smui/fab";

    enum PinResult { None, Success, Fail }

    const pin: string = '4269';
    let entered: string = '', result: PinResult = PinResult.None;

    function enter(num: number|string){
        entered += num;
        if(entered.length === pin.length){
            result = entered === pin ? PinResult.Success : PinResult.Fail;
            entered = '';
            return;
        }
        result = PinResult.None;
    }
    function resultMessage(res: PinResult): string|null {
        switch (res) {
            case PinResult.Success:
                return 'Success!';
            case PinResult.Fail:
                return 'Wrong PIN!';
            default:
                return null;
        }
    }
</script>

<div class="code-display"
     class:success={result === PinResult.Success}
     class:fail={result === PinResult.Fail}
>
    {'*'.repeat(entered.length) || resultMessage(result) || 'Enter PIN'}
</div>
<div class="numpad">
    {#each Array(10) as _, i}
        <div style="--num: n{i}">
            <Fab on:click={() => enter(i)} style="--num:n{i}">{i}</Fab>
        </div>
    {/each}
</div>

<style>
    .code-display {
        text-align: center;
        text-transform: uppercase;
        padding: 1rem 1rem 1rem 3rem;
        margin-bottom: 1rem;
        font-size: 2rem;
        letter-spacing: 2rem;
    }
    .code-display.success {
        color: forestgreen;
    }
    .code-display.fail {
        color: crimson;
    }
    .numpad {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-template-areas: "n1 n2 n3" "n4 n5 n6" "n7 n8 n9" ". n0 .";
        gap: 1rem;
        justify-items: center;
        align-items: center;
    }

    .numpad > div {
        --num: n0;
        grid-area: var(--num);
    }
</style>