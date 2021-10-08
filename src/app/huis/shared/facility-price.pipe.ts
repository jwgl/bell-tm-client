import { Pipe, PipeTransform } from '@angular/core';
import { formatTimeUnit } from './common.model';

@Pipe({ name: 'facilityPrice' })
export class FacilityPricePipe implements PipeTransform {
    transform(facility: {
        basePrice: number,
        unitPrice: number,
        unitName: String,
        timeUnit: number,
    }): string {
        if (facility.basePrice > 0) {
            return `¥${facility.basePrice}/${facility.unitName} + ¥${facility.unitPrice}/${facility.unitName}·${formatTimeUnit(facility.timeUnit)}`;
        } else {
            return `¥${facility.unitPrice}/${facility.unitName}·${formatTimeUnit(facility.timeUnit)}`;
        }
    }
}
