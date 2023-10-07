import ciSvelte from "./ciSvelte";
import ciMoodle from "./ciMoodle";
import ciTypeScript from "./ciTypeScript";
import type {IconDefinition, IconName} from "@fortawesome/free-brands-svg-icons";

export type CustomIconName = Exclude<string, IconName>;
export type CustomIconDefinition = Omit<IconDefinition, 'iconName'> & {iconName: CustomIconName};

export {ciSvelte, ciMoodle, ciTypeScript};

const loadFactoryIcon = async (icon: string): Promise<IconDefinition|undefined> => {
    return (await import("../../../node_modules/@fortawesome/free-brands-svg-icons/index.js"))[icon] as IconDefinition;
}

const loadCustomIcon = async (icon: string): Promise<CustomIconDefinition|undefined> => {
    switch (icon) {
        case "ciSvelte":
            return ciSvelte;
        case "ciMoodle":
            return ciMoodle;
        case "ciTypeScript":
            return ciTypeScript;
        default:
            return undefined;
    }
}

/**
 * Loads an icon from the fontawesome library or from the custom icons
 * @param icon The icon to load
 */
export const loadIcon = async (icon: string|undefined): Promise<IconDefinition|CustomIconDefinition|undefined> => {
    if(!icon)
        return undefined;

    const loader = icon.startsWith("ci") ? loadCustomIcon : loadFactoryIcon;
    return loader(icon);
}