import type {IconPathData} from "@fortawesome/fontawesome-common-types";
import type {IconPrefix} from "@fortawesome/free-brands-svg-icons";
import type {CustomIconDefinition, CustomIconName} from "$lib/custom-icons";

export const prefix: IconPrefix = 'fab';
export const iconName: CustomIconName = 'moodle';
export const width = 400;
export const height = 315.2;
export const aliases: string[] = [];
export const unicode: string = 'ff01';
export const svgPathData: IconPathData = 'M330.4,105.5c-14.4-10.8-33.9-16.2-58.5-16.2c-26.9,0-45.4,6.4-55.6,19.2c-2.7-2.9-5.7-5.5-9.1-7.7c0,0,0,0,0,0c-7.5-8.4-22.1-19.8-22.1-19.8l54.7-40l-0.7-2.4c-98.8,12.1-143.7,20.7-228.8,70l0.8,2.2l6.8,0.1c-0.6,6.8-1.7,23.6-0.3,48.9c-9.4,27.3-0.2,45.9,8.4,66.1c1.4-21,1.2-44-5.2-66.9c-1.4-25.1-0.2-41.7,0.4-48.1l56.4,0.5c-0.2,11,0.4,22.1,1.7,33.1c0,0,0,0,0,0c-0.8,4.6-1.2,9.5-1.2,14.7v114.6h55.2V165.5c0-6,0.7-11.3,2-15.7c14.2-2.3,27.6-7.6,39.6-15.4c9.3,4.6,14,15,14,31.1v108.3h55.1V165.5c0-22.6,9.4-34,28.1-34s28,11.3,28,34v108.3H355V159.1C355,135.5,346.8,117.6,330.4,105.5z';

const icon: CustomIconDefinition = {
    prefix,
    iconName,
    icon: [
        width,
        height,
        aliases,
        unicode,
        svgPathData
    ]
}

export default icon;