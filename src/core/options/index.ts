import { NumberStringOption } from './number-string-option';
import { StringStringOption } from './string-string-option';
export { NumberStringOption } from './number-string-option';
export { StringStringOption } from './string-string-option';
export { OddEvenOptions } from './odd-even';
export { DayOfWeekOptions } from './day-of-week';

export function toStringMap(array: StringStringOption[], field ='label'): { [key: string]: string } {
    return array.reduce((result, item) => {
        result[item.value] = item[field];
        return result;
    }, {});
}

export function toNumberMap(array: NumberStringOption[], field ='label'): { [key: number]: string } {
    return array.reduce((result, item) => {
        result[item.value] = item[field];
        return result;
    }, {});
}
