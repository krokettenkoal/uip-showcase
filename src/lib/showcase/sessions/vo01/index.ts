import type {ShowcaseSession} from "$lib/showcase/showcase";
import Counter from "./examples/counter";
import Pin from "./examples/pin";
import Todo from "./examples/todo";

const data: ShowcaseSession = {
    id: "vo01",
    title: "Lecture 1",
    subtitle: "Introduction",
    examples: [
        Counter,
        Pin,
        Todo
    ]
}

export default data;