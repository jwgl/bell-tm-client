import { Pipe, PipeTransform } from '@angular/core';
import { RoomFacilityView } from "../../../shared/booking-form.model";

@Pipe({ name: 'isBasicFacility' })
export class IsBasicFacilityPipe implements PipeTransform {
    transform(facilities: RoomFacilityView[]) {
        return facilities.filter(facility => facility.isBasic);
    }
}

@Pipe({ name: 'isExtraFacility' })
export class IsExtraFacilityPipe implements PipeTransform {
    transform(facilities: RoomFacilityView[], isBasic: boolean) {
        return facilities.filter(facility => !facility.isBasic && !facility.requiredGroup);
    }
}

@Pipe({ name: 'isRequiredFacility' })
export class IsRequriedFacilityPipe implements PipeTransform {
    transform(facilities: RoomFacilityView[], isBasic: boolean) {
        return facilities.filter(facility => !facility.isBasic && !!facility.requiredGroup)
            .reduce((result, facility) => {
                var group = result.find(it => it.key == facility.requiredGroup);
                if (!group) {
                    group = { key: facility.requiredGroup, value: [] }
                    result.push(group);
                }
                group.value.push(facility)
                return result;
            }, [])
            .sort((a, b) => a.key - b.key);
    }
}
