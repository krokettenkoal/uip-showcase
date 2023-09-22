import type {ShowcaseExample} from "$lib/showcase/showcase";
import Component from './PinLock.svelte';
import SourceSvelte from './PinLock.svelte.txt?raw';
import SourceVanilla from './PinLock.html?raw';

const data: ShowcaseExample = {
    id: 'pin',
    title: 'PIN Code',
    subtitle: 'A simple PIN code, as seen on a phone lock screen',
    icon: 'dialpad',
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