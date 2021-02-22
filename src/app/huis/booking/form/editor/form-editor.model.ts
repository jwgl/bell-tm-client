import * as dayjs from 'dayjs';
import { BookingForm, BookingItem } from '../../shared/booking-form.model';

declare module '../../shared/booking-form.model' {
    interface BookingForm {
        addItem(dto: any): void;
        removeItem(item: BookingItem): void;
        conflict(item: BookingItem): boolean;
        toServerDto(): any;
        valid: boolean
    }

    interface BookingItem {
        deleted: boolean;
    }

    interface BookingFacility {
        deleted: boolean;
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

BookingForm.prototype.addItem = function (this: BookingForm, dto: any): void {
    const item = new BookingItem(this, dto);
    if (!this.conflict(item)) {
        this.items.push(item);
    }
};

BookingForm.prototype.removeItem = function (this: BookingForm, item: BookingItem): void {
    if (item.id) {
        item.deleted = !item.deleted;
    } else {
        this.items.splice(this.items.indexOf(item), 1);
    }
};

BookingForm.prototype.conflict = function (this: BookingForm, item: BookingItem): boolean {
    return this.items.filter(it => !it.deleted).some(it => it.room.id === item.room.id
        && it.bookingLowerTime < item.bookingUpperTime
        && item.bookingLowerTime < it.bookingUpperTime
    );
};

Object.defineProperty(BookingForm.prototype, 'valid', {
    get: function (this: BookingForm) {
        return this.items.filter(it => !it.deleted).length > 0;
    },
    enumerable: true,
    configurable: true,
});

BookingForm.prototype.toServerDto = function (this: BookingForm): any {
    return {
        id: this.id,
        departmentId: this.department.id,
        bookingTypeId: this.bookingType.id,
        subject: this.subject,
        isInternal: this.isInternal,
        description: this.description,
        attendance: this.attendance,
        addedItems: this.items.filter(it => !it.id).map(it => ({
            id: it.id,
            roomId: it.room.id,
            lowerTime: dayjs(it.bookingLowerTime).format('YYYY-MM-DDTHH:mm:ss'),
            upperTime: dayjs(it.bookingUpperTime).format('YYYY-MM-DDTHH:mm:ss'),
            note: it.note,
            facilities: it.facilities.filter(it => !it.deleted).map(it => ({
                id: it.id,
                facilityId: it.facility.id,
                quantity: it.quantity,
                note: it.note,
            })),
        })),
        removedItems: this.id ? this.items.filter(it => it.deleted).map(it => it.id) : null,
    };
};

