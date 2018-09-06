import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'observerGroup' })
export class ObserverGroupPipe implements PipeTransform {
    transform(data: any[], args: any) {
        return data.filter(item => item.observerType === args);
    }
}
