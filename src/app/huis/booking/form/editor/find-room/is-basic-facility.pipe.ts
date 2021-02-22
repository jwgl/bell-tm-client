import { Pipe, PipeTransform } from '@angular/core';
import { RoomFacilityView } from "../../../shared/booking-form.model";

@Pipe({ name: 'isBasicFacility' })
export class IsBasicFacilityPipe implements PipeTransform {
    transform(facilities: RoomFacilityView[], isBasic: boolean) {
        return facilities.filter(facility => facility.isBasic == isBasic);
    }
}
