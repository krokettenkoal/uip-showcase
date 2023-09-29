import ciSvelte from "./ciSvelte";
import ciMoodle from "./ciMoodle";
import ciTypeScript from "./ciTypeScript";
import type {IconDefinition, IconName} from "@fortawesome/free-brands-svg-icons";

export type CustomIconName = Exclude<string, IconName>;
export type CustomIconDefinition = Omit<IconDefinition, 'iconName'> & {iconName: CustomIconName};

export {ciSvelte, ciMoodle, ciTypeScript};