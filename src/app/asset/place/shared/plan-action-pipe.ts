import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'planAction'})
export class ActionPipe implements PipeTransform {
    transform(value: string) {
        return { CREATE: '新建', REMOVE: '取消', SEPARATE: '分拆', MERGE: '合并', OTHER: '其他' }[value];
    }
}
