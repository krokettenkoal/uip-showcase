import ciSvelte from "./ciSvelte";
import ciMoodle from "./ciMoodle";
import ciTypeScript from "./ciTypeScript";
import type {IconDefinition, IconName} from "@fortawesome/free-brands-svg-icons";

export type CustomIconName = Exclude<string, IconName>;
export type CustomIconDefinition = Omit<IconDefinition, 'iconName'> & {iconName: CustomIconName};

export {ciSvelte, ciMoodle, ciTypeScript};

export const loadIcon = async (icon: string|undefined): Promise<IconDefinition|CustomIconDefinition|undefined> => {
    if(!icon)
        return undefined;

    if(icon.startsWith("ci")){
        return (await import(/* @vite-ignore */ `./${icon}`)).default;
    }

    return (await import("@fortawesome/free-brands-svg-icons"))[icon] as IconDefinition;
}