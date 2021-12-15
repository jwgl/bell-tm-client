import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
    transform(value: string) {
        return { ON: '在用', BACKUP: '储备', DELETED: '取消', RAW: '未创建' }[value];
    }
}
