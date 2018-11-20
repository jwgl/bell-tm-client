import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'uniqueBy' })
export class UniqueByPipe implements PipeTransform {
    transform(list: any[], key: string) {
        return _.chain(list)
            .map(data => data[key])
            .uniq()
            .sort()
            .value();
    }
}
