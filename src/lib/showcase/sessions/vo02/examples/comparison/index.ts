import type {ShowcaseExample} from "$lib/showcase/showcase";
import SourceVanilla from './vanilla.txt?raw';
import SourceJSDoc from './jsdoc.txt?raw';
import SourceTS from './ts.txt?raw';
import {ciTypeScript} from "$lib/custom-icons";
import {faJs} from "@fortawesome/free-brands-svg-icons";
import {javascript, typescript} from "svelte-highlight/languages";

const data: ShowcaseExample = {
    id: 'comparison',
    title: 'Comparison',
    subtitle: 'A simple comparison example',
    icon: 'compare_arrows',
    image: 'ts_vs_js.png',
    component: null,
    src: [
        {
            title: 'Vanilla',
            code: SourceVanilla,
            icon: faJs,
            language: javascript
        },
        {
            title: 'JSDoc',
            code: SourceJSDoc,
            icon: faJs,
            language: javascript
        },
        {
            title: 'TypeScript',
            code: SourceTS,
            icon: ciTypeScript,
            language: typescript
        }
    ]
}

export default data;