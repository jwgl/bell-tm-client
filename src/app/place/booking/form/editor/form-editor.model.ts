import { weekRangeConflict } from 'core/utils';
import * as _ from 'lodash';
import { BookingForm, BookingItem } from '../../shared/booking-form.model';

declare module '../../shared/booking-form.model' {
    interface BookingForm {
        addItem(dto: any): void;
        removeItem(item: BookingItem): void;
        conflict(item: BookingItem): boolean;
        toServerDto(): any;
        getAddedItems(): any[];
    }

    interface BookingItem {
        getSectionName(): string;
    }
}

BookingForm.prototype.addItem = function (this: BookingForm, dto: any): void {
    const item = new BookingItem(this, dto);
    if (!this.conflict(item)) {
        this.items.push(item);
    }
};

BookingForm.prototype.removeItem = function (this: BookingForm, item: BookingItem): void {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    if (item.id) {
        this.removedItems.push(item);
    }
};

BookingForm.prototype.conflict = function (this: BookingForm, item: BookingItem): boolean {
    return this.items.some(it => {
        return it.place.id === item.place.id
            && it.dayOfWeek === item.dayOfWeek
            && weekRangeConflict(it, item)
            && _.intersection(it.section.includes, item.section.includes).length > 0;
    });
};

BookingForm.prototype.toServerDto = function (this: BookingForm): any {
    return {
        departmentId: this.department.id,
        bookingTypeId: this.bookingType.id,
        reason: this.reason,
        numberOfUsers: this.numberOfUsers,
        addedItems: this.getAddedItems(),
        removedItems: this.id ? this.removedItems.map(it => it.id) : null,
    };
};

BookingForm.prototype.getAddedItems = function (this: BookingForm) {
    return this.items.filter(it => !it.id).map(it => ({
        placeId: it.place.id,
        startWeek: it.startWeek,
        endWeek: it.endWeek,
        oddEven: it.oddEven,
        dayOfWeek: it.dayOfWeek,
        sectionId: it.section.id,
    }));
};
