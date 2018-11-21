import { Pipe, PipeTransform } from '@angular/core';

import { RESPONSE_VISIBILITIES_MAP } from './response-visibility.model';

@Pipe({ name: 'responseVisibilityText' })
export class ResponseVisibilityTextPipe implements PipeTransform {
    transform(responseVisibility: string) {
        return RESPONSE_VISIBILITIES_MAP[responseVisibility];
    }
}
