import { Component } from '@angular/core';
import { BaseDialog } from 'core/dialogs';

import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

import { formatTimeUnit } from '../../../../shared/common.model';
import { BookingForm, BookingRoomView, RoomFacilityView } from '../../../shared/booking-form.model';
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
    requiredSelection: any = {};

    constructor(private service: BookingFormService) {
        super();
    }

    protected onOpening(): Observable<any> {
        this.form = this.options.form;
        this.selectedRoom = null;
        this.bookingDate = dayjs(new Date()).format('YYYY-MM-DD');
        this.lowerTime = '08:00';
        this.upperTime = '22:00'
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
            }].concat(
                this.bookingRoom.facilities
                    ? this.bookingRoom.facilities.filter(it => !it.isBasic && it.selected)
                        .map(it => ({
                            facilityId: it.id,
                            facilityName: it.name,
                            unitPrice: it.unitPrice,
                            unitName: it.unitName,
                            timeUnit: it.timeUnit,
                            quantity: it.quantity,
                            isAdditional: true,
                            note: it.note,
                        }))
                    : []
            ).concat(
                this.bookingRoom.facilities
                    ? Object.keys(this.requiredSelection)
                        .map(key => this.requiredSelection[key])
                        .filter(id => !!id)
                        .flatMap(id => this.bookingRoom.facilities.filter(it => it.id == id)
                            .map(it => ({
                                    facilityId: it.id,
                                    facilityName: it.name,
                                    unitPrice: it.unitPrice,
                                    unitName: it.unitName,
                                    timeUnit: it.timeUnit,
                                    quantity: it.quantity,
                                    isAdditional: true,
                                    note: it.note,
                                })
                            )
                        )
                    : []
            ),
        };
    }

    formatRequiredSelection(): string {
        return Object.keys(this.requiredSelection).join(",")
    }

    formatRoom(room: Room): string {
        if (this.form.isInternal && room.isInternalFree) {
            return `${room.name}（${room.seat}座）`;
        } else {
            return `${room.name}（${room.seat}座，¥${room.unitPrice}/${formatTimeUnit(room.timeUnit)}）`;
        }
    }

    formatBasicFacility(facility: RoomFacilityView): string {
        if (facility.quantity > 1) {
            return `${facility.quantity}${facility.unitName}${facility.name}`;
        } else {
            return `${facility.name}`;
        }
    }

    formatFacilityPrice(facility: RoomFacilityView): string {
        if (facility.basePrice > 0) {
            return `¥${facility.basePrice}/${facility.unitName} + ¥${facility.unitPrice}/${facility.unitName}·${formatTimeUnit(facility.timeUnit)}`;
        } else {
            return `¥${facility.unitPrice}/${facility.unitName}·${formatTimeUnit(facility.timeUnit)}`;
        }
    }

    isQuantityHidden(facility: RoomFacilityView): boolean {
        return facility.quantity == 1 && facility.quantity == facility.quantityLimit;
    }

    hasBasicFacility(bookingRoom: BookingRoomView): boolean {
        return bookingRoom.facilities && bookingRoom.facilities.filter(it => it.isBasic).length > 0;
    }

    hasExtraFacility(bookingRoom: BookingRoomView): boolean {
        return bookingRoom.facilities && bookingRoom.facilities.filter(it => !it.isBasic && !it.requiredGroup).length > 0;
    }

    hasRequiredFacility(bookingRoom: BookingRoomView): boolean {
        return bookingRoom.facilities && bookingRoom.facilities.filter(it => !it.isBasic && !!it.requiredGroup).length > 0;
    }

    onRoomChanged(room: Room) {
        this.service.loadRoom(room.id).subscribe(result => {
            this.bookingRoom = result;
            this.requiredSelection = {};
            if (this.bookingRoom.facilities) {
                this.bookingRoom.facilities.forEach(it => {
                    if (it.requiredGroup) {
                        this.requiredSelection[it.requiredGroup] = null;
                    }
                });
            }
        });
    }

    get isConflict(): boolean {
        const lowerTime = new Date(`${this.bookingDate}T${this.lowerTime}`);
        const upperTime = new Date(`${this.bookingDate}T${this.upperTime}`);
        const result = this.bookingRoom && this.bookingRoom.bookedTimes.every(it =>
            !(it.lowerTime < upperTime && lowerTime < it.upperTime)
        );
        return !result;
    }

    get requiredSelected(): boolean {
        const keys = Object.keys(this.requiredSelection);
        return keys.length == 0 || keys.every(key => !!this.requiredSelection[key]);
    }

    get today(): string {
        return dayjs().format('YYYY-MM-DD');
    }

    get maxday(): string {
        return dayjs().add(20, 'day').format('YYYY-MM-DD');
    }
}
