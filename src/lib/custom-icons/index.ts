import ciSvelte from "./ciSvelte";
import ciMoodle from "./ciMoodle";
import type {IconDefinition, IconName} from "@fortawesome/free-brands-svg-icons";

export type CustomIconName = Exclude<string, IconName>;
export type CustomIconDefinition = Omit<IconDefinition, 'iconName'> & {iconName: CustomIconName};

export {ciSvelte, ciMoodle};