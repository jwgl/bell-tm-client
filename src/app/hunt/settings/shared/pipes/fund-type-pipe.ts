import { Pipe, PipeTransform } from '@angular/core';

import { FundType, fundTypeLabels } from '../constants';

@Pipe({name: 'fundType'})
export class FundTypePipe implements PipeTransform {
    transform(value: FundType, arg: string) {
        if (!value) {
            return null;
        }
        if (arg === 'text') {
            return fundTypeLabels[FundType[value]].text;
        } else if (arg === 'class') {
            return fundTypeLabels[FundType[value]].class;
        }
    }
}
