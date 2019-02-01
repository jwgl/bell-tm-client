import { Pipe, PipeTransform } from '@angular/core';

import { ChangeTypeList } from '../constants';

@Pipe({name: 'changeType'})
export class ChangeTypePipe implements PipeTransform {
    transform(value: number[]) {
        return value.reduce((type: string, item) => {
            const changeType = ChangeTypeList.find(ct => ct.value === item);
            return changeType ? `${type ? type + ', ' : ''}${changeType.label}` : `${type}`;
        }, '');
    }
}
