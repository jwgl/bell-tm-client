import { Directive, Input } from '@angular/core';
import { ValidationErrors, AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[isConflict]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ConflictValidatorDirective, multi: true }]
})
export class ConflictValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        const roomControl = control.get('bookingRoom');
        const dateControl = control.get('bookingDate');
        const lowerTimeControl = control.get('lowerTime');
        const upperTimeControl = control.get('upperTime');
        if (!roomControl || !roomControl.value ||
            !dateControl || !dateControl.value ||
            !lowerTimeControl || !lowerTimeControl.value ||
            !upperTimeControl || !upperTimeControl.value) {
            return null;
        }
        console.log(lowerTimeControl)
        const bookingTime = roomControl.value.bookedTimes as any[];
        if (!bookingTime) {
            return null;
        }

        const lowerTime = `${dateControl.value}T${lowerTimeControl.value}`;
        const upperTime = `${dateControl.value}T${upperTimeControl.value}`;

        if (lowerTime >= upperTime) {
            upperTimeControl.setErrors({ lower: true });
            return { lower: true };
        }

        bookingTime.forEach(it => {
            it.conflict = (it.lowerTime < upperTime && lowerTime < it.upperTime);
        });
        if (bookingTime.some(it => it.conflict)) {
            return { conflict: true };
        }

        // If there is no validation failure, return null
        return null;
    }
}