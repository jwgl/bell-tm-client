import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterBy' })
export class FilterByPipe implements PipeTransform {
    transform(data: any[], predicate: (item: any) => boolean) {
        return data.filter(predicate);
    }
}
