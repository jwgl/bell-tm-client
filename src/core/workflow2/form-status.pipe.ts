import { Pipe, PipeTransform } from '@angular/core';

import { formStatusClass, formStatusText } from './form-status';

@Pipe({ name: 'formStatusText' })
export class FormStatusTextPipe implements PipeTransform {
    transform(value: string) {
        return formStatusText(value);
    }
}

@Pipe({ name: 'formStatusClass' })
export class FormStatusClassPipe implements PipeTransform {
    transform(value: string) {
        return formStatusClass(value);
    }
}
