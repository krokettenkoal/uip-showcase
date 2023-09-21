import type {ShowcaseExample} from "$lib/showcase/showcase";
import Component from './Counter.svelte';
import SourceSvelte from './Counter.svelte.txt?raw';
import SourceVanilla from './counter.html?raw';

const data: ShowcaseExample = {
    id: 'counter',
    title: 'Counter',
    icon: 'exposure_plus_1',
    component: Component,
    src: [
        {
            title: 'Svelte',
            code: SourceSvelte
        },
        {
            title: 'Vanilla',
            code: SourceVanilla
        }
    ]
}

export default data;