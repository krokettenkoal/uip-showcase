import type {ShowcaseExample} from "$lib/showcase/showcase";
import Component from './PinLock.svelte';
import SourceSvelte from './PinLock.svelte.txt?raw';
import SourceVanilla from './PinLock.html?raw';
import {ciSvelte} from "$lib/custom-icons";
import {faJs} from "@fortawesome/free-brands-svg-icons";

const data: ShowcaseExample = {
    id: 'pin',
    title: 'PIN Code',
    subtitle: 'A simple PIN code, as seen on a phone lock screen',
    icon: 'dialpad',
    image: 'pin.webp',
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