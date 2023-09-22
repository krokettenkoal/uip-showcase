import type {ShowcaseExample} from "$lib/showcase/showcase";
import Component from './Todo.svelte';
import SourceSvelte from './Todo.svelte.txt?raw';
import SourceVanilla from './Todo.html?raw';
import SourceReact from './Todo.jsx?raw';
import {javascript} from "svelte-highlight/languages";

const data: ShowcaseExample = {
    id: 'todo',
    title: 'To-do',
    subtitle: 'A (very) basic to-do list',
    icon: 'checklist',
    component: Component,
    src: [
        {
            title: 'Svelte',
            code: SourceSvelte
        },
        {
            title: 'Vanilla',
            code: SourceVanilla
        },
        {
            title: 'React',
            code: SourceReact,
            language: javascript
        }
    ]
}

export default data;