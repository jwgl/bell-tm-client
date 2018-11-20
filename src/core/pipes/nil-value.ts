import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nilValue' })
export class NilValuePipe implements PipeTransform {
    transform(value: any, nilValue: string) {
        if (value == null) { // null or undefined
            if (nilValue) {
                return nilValue;
            } else {
                return '<空>';
            }
        } else {
            return value;
        }
    }
}
