import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'majorGroup' })
export class MajorGroupPipe implements PipeTransform {
    transform(data: any[], args: any) {
        if (data && args) {
            return data.filter(item => item.departmentId === args.departmentId &&
                                        item.grade === args.grade &&
                                        item.subjectName === args.subjectName);
        } else {
            return data;
        }
    }
}
