import { Pipe, PipeTransform } from '@angular/core';
import { groupBy } from '../utils/group-by';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
    transform(data: any, conditions: any[]) {
        groupBy(data, conditions);
    }
}
