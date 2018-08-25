import { Pipe } from '@angular/core';

@Pipe({ name: 'filterBy' })
export class FilterByPipe {
    transform(data: any[], predicate: (item: any) => boolean) {
        return data.filter(predicate);
    }
}
