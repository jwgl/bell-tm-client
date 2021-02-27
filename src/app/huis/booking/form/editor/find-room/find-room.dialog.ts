import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { BaseDialog } from 'core/dialogs';

import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

import { BookingForm, BookingRoomView, formatTimeUnit, RoomFacilityView } from '../../../shared/booking-form.model';
import { BookingFormService } from '../../booking-form.service';
import { Room } from './find-room.model';



@Component({
    styleUrls: ['find-room.dialog.scss'],
    templateUrl: 'find-room.dialog.html',
})
export class FindRoomDialog extends BaseDialog {
    form: BookingForm;
    selectedRoom: Room;
    bookingRoom: BookingRoomView;
    bookingDate: string;
    lowerTime: string;
    upperTime: string;

    constructor(private service: BookingFormService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.selectedRoom = null;
        this.bookingDate = dayjs(new Date()).format('YYYY-MM-DD');
        return this.service.loadRooms();
    }

    protected onConfirmed(): any {
        return {
            roomId: this.bookingRoom.id,
            roomName: this.bookingRoom.name,
            bookingLowerTime: `${this.bookingDate}T${this.lowerTime}:00Z`,
            bookingUpperTime: `${this.bookingDate}T${this.upperTime}:00Z`,
            timeUnit: this.bookingRoom.timeUnit,
            facilities: [{
                facilityId: 101001,
                facilityName: '基本服务费用',
                unitPrice: this.bookingRoom.unitPrice,
                unitName: '次',
                timeUnit: this.bookingRoom.timeUnit,
                quantity: 1,
                isAdditional: false,
                note: '',
            }].concat(this.bookingRoom.facilities.filter(it => !it.isBasic && it.selected).map(it => ({
                facilityId: it.id,
                facilityName: it.name,
                unitPrice: it.unitPrice,
                unitName: it.unitName,
                timeUnit: it.timeUnit,
                quantity: it.quantity,
                isAdditional: false,
                note: it.note,
            }))),
        };
    }

    formatRoom(room: Room): string {
        if (this.form.isInternal && room.isInternalFree) {
            return `${room.name}（${room.seat}座）`;
        } else {
            return `${room.name}（${room.seat}座，${room.unitPrice}元/${formatTimeUnit(room.timeUnit)}）`;
        }
    }

    formatBasicFacility(facility: RoomFacilityView): string {
        if (facility.quantity > 1) {
            return `${facility.quantity}${facility.unitName}${facility.name}`;
        } else {
            return `${facility.name}`;
        }
    }
     
    formatExtraFacility(facility: RoomFacilityView): string {
        if (facility.quantity > 1) {
            return `${facility.name}（${facility.unitPrice}元/${facility.quantity}${facility.unitName}·${formatTimeUnit(facility.timeUnit)}）`;
        } else {
            return `${facility.name}（${facility.unitPrice}元/${facility.unitName}·${formatTimeUnit(facility.timeUnit)}）`;
        }
    }

    hasBasicFacility(bookingRoom: BookingRoomView): boolean {
        return bookingRoom.facilities && bookingRoom.facilities.filter(it => !it.isBasic).length > 0;
    }

    hasExtraFacility(bookingRoom: BookingRoomView): boolean {
        return bookingRoom.facilities && bookingRoom.facilities.filter(it => !it.isBasic).length > 0;
    }

    onRoomChanged(room: Room) {
        this.service.loadRoom(room.id).subscribe(result => this.bookingRoom = result);
    }

    get isConflict(): boolean {
        const lowerTime = new Date(`${this.bookingDate}T${this.lowerTime}`);
        const upperTime = new Date(`${this.bookingDate}T${this.upperTime}`);
        const result = this.bookingRoom && this.bookingRoom.bookedTimes.every(it => 
            !(it.lowerTime < upperTime && lowerTime < it.upperTime)
        );
        console.log(lowerTime)
        console.log(upperTime)
        console.log(!result)
        return !result;
    }
}
