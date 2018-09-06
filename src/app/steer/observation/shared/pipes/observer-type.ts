import { Pipe, PipeTransform } from '@angular/core';

import { ObserverTypes } from '../constant';

@Pipe({ name: 'typeLabel' })
export class TypeTextPipe implements PipeTransform {
    transform(value: number) {
        const types = ObserverTypes;
        return types.filter(item => item.id === value).map(data => data.name);
    }
}
