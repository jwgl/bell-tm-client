import { Pipe, PipeTransform } from '@angular/core';

import { completeActionClass, completeActionText } from './complete-action';

@Pipe({ name: 'completeActionText' })
export class CompleteActionTextPipe implements PipeTransform {
    transform(value: string) {
        return completeActionText(value);
    }
}

@Pipe({ name: 'completeActionClass' })
export class CompleteActionClassPipe implements PipeTransform {
    transform(value: string) {
        return completeActionClass(value);
    }
}
