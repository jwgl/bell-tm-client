import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'planStatus'})
export class PlanStatusPipe implements PipeTransform {
    transform(value: string) {
        return { CREATED: '新建', DOING: '改造中', CANCEL: '取消', FINISHED: '已完成' }[value];
    }
}
