import type {ShowcaseExample} from "$lib/showcase/showcase";
import Component from './Todo.svelte';
import SourceSvelte from './Todo.svelte.txt?raw';
import SourceVanilla from './Todo.html?raw';
import SourceReact from './Todo.jsx?raw';
import {javascript} from "svelte-highlight/languages";
import {ciSvelte} from "$lib/custom-icons";
import {faReact} from "@fortawesome/free-brands-svg-icons";
import {faJs} from "@fortawesome/free-brands-svg-icons";

const data: ShowcaseExample = {
    id: 'todo',
    title: 'To-do',
    subtitle: 'A (very) basic to-do list',
    icon: 'checklist',
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
        },
        {
            title: 'React',
            code: SourceReact,
            icon: faReact,
            language: javascript
        }
    ]
}

export default data;