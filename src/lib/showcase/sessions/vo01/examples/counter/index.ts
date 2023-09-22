import type {ShowcaseExample} from "$lib/showcase/showcase";
import Component from './Counter.svelte';
import SourceSvelte from './Counter.svelte.txt?raw';
import SourceVanilla from './counter.html?raw';
import {ciSvelte} from "$lib/custom-icons";
import {faJs} from "@fortawesome/free-brands-svg-icons";

const data: ShowcaseExample = {
    id: 'counter',
    title: 'Counter',
    subtitle: 'A simple counter example',
    icon: 'exposure_plus_1',
    image: 'counter.jpg',
    component: Component,
    src: [
        {
            title: 'Svelte',
            code: SourceSvelte,
            icon: ciSvelte
        },
        {
            title: 'Vanilla',
            code: SourceVanilla,
            icon: faJs
        }
    ]
}

export default data;