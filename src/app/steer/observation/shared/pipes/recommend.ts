import { Pipe, PipeTransform } from '@angular/core';

import { Recommends } from '../../form/shared/form.model';

@Pipe({ name: 'recommendLabel' })
export class RecommendPipe implements PipeTransform {
    transform(value: number) {
        return Recommends[value];
    }
}
