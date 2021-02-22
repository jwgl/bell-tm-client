import * as dayjs from 'dayjs';
import { OperationForm, BookingFacility } from '../../shared/operation-form.model';

declare module '../../shared/operation-form.model' {
    interface OperationForm {
        addFacility(facility: any);
        removeFacility(item: BookingFacility);
        toServerDto(): any;
        deleted: boolean;
    }

    interface BookingFacility {
        newStatus: string;
        deleted: boolean;
        __deleted: boolean,
    }

    interface BookingAuth {
        departmentId: string;
        departmentName: string;
        bookingTypeId: number;
        bookingTypeName: string;
        userId: string;
        userName: string;
    }
}

OperationForm.prototype.addFacility = function (this: OperationForm, facility: any) {
    this.facilities.push(new BookingFacility(this, {
        facilityId: facility.id,
        facilityName: facility.name,
        unitPrice: facility.unitPrice,
        unitName: facility.unitName,
        quantity: facility.quantity,
        isAdditional: true,
    }))
}

OperationForm.prototype.removeFacility = function (this: OperationForm, item: BookingFacility) {
    if (item.id) {
        item.deleted = !item.deleted;
    } else {
        this.facilities.splice(this.facilities.indexOf(item), 1);
    }
}

OperationForm.prototype.toServerDto = function (this: OperationForm): any {
    return {
        id: this.id,
        actualLowerTime: dayjs(this.actualLowerTime).format('YYYY-MM-DDTHH:mm:ss'),
        actualUpperTime: dayjs(this.actualUpperTime).format('YYYY-MM-DDTHH:mm:ss'),
        originalFacilities: this.facilities.filter(it => !it.isAdditional && it.newStatus).map(it => ({
            id: it.id,
            status: it.newStatus,
        })),
        addedFacilities: this.facilities.filter(it => it.isAdditional && !it.id).map(it => ({
            facilityId: it.facility.id,
            quantity: it.quantity,
        })),
        removedFacilities: this.facilities.filter(it => it.isAdditional && it.deleted).map(it => it.id),
    };
};

Object.defineProperty(BookingFacility.prototype, 'deleted', {
    get: function (this: BookingFacility) {
        return this.isAdditional ? this.__deleted : (this.newStatus || this.status) != 'ACTIVE';
    },
    set: function (this: BookingFacility, value: boolean) {
        if (this.isAdditional) {
            this.__deleted = value;
        } else {
            this.newStatus = value ?  'UNUSED' : 'ACTIVE';
            if (this.newStatus == this.status) {
                this.newStatus = undefined;
            }
        }
    },
    enumerable: true,
    configurable: true,
});
