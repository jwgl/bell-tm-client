import { formatNumber } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'facilitySubtotal' })
export class FacilitySubtotalPipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private locale: string) {}
    
    transform(facility: {
        subtotal: number,
    }): string {
        if (facility.subtotal > 0) {
            return `¥${formatNumber(facility.subtotal, this.locale, '.2-2')}`;
        } else {
            return ``;
        }
    }
}
