import { Pipe, PipeTransform } from '@angular/core';

import { numberToChinese } from 'core/utils';

@Pipe({ name: 'termName' })
export class TermNamePipe implements PipeTransform {
    transform(value: number) {
        if (value < 16) {
            return `第${numberToChinese(value)}学期`;
        } else {
            return `小学期${value - 16}`;
        }
    }
}
