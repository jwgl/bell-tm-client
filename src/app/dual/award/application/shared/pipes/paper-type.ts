import { Pipe, PipeTransform } from '@angular/core';

import { paperTypeLabels } from '../constant';

@Pipe({ name: 'typeLabel' })
export class TypeTextPipe implements PipeTransform {
    transform(value: number) {
        const types = paperTypeLabels;
        return types.filter(item => item.id === value).map(data => data.label);
    }
}
