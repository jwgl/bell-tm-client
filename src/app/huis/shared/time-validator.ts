import { Directive, Input } from '@angular/core';
import { ValidationErrors, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: 'input[type=time][min] input[type=time][max]',
    providers: [{provide: NG_VALIDATORS, useExisting: TimeValidator, multi: true}]
})
export class TimeValidator {
    @Input('min') min: string;
    @Input('max') max: string
    
    validate(control: AbstractControl): ValidationErrors | null {
        if (this.min && control.value < this.min) {
            return { min : {value: this.min}}
        }

        if (this.max && control.value > this.max) {
            return { max : {value: this.max}}
        }
        // If there is no validation failure, return null
        return null;
    }
}
