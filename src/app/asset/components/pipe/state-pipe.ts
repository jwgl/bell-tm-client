import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'state'})
export class StatePipe implements PipeTransform {
    transform(value: string) {
        return { USING: '在用', STANDBY: '备用', REPAIRING: '维修', OFF: '报废',  CLEARANCE: '核销', LOST: '丢失'}[value];
    }
}
