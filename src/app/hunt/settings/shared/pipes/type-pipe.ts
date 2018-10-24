import { Pipe, PipeTransform } from '@angular/core';

import { ReviewType, typeLabels } from '../constants';

@Pipe({name: 'reviewType'})
export class ReviewTypePipe implements PipeTransform {
    transform(value: ReviewType, arg: string) {
        if (arg === 'text') {
            return typeLabels[ReviewType[value]].value;
        } else if (arg === 'class') {
            return typeLabels[ReviewType[value]].class;
        }
    }
}
