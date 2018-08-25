import { Pipe, PipeTransform } from '@angular/core';

import { Property } from '../../shared/scheme.model';

@Pipe({ name: 'propertyToes' })
export class PropertyToesPipe implements PipeTransform {
    transform(properties: Property[]) {
        return properties.filter(p => p.name !== '通识必修课' && p.name !== '通识选修课');
    }
}
