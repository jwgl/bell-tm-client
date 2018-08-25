import { Directive, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AllowedTermComponent } from './allowed-term.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'tm-allowed-termx',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AllowedTermAccessor), multi: true }],
})
export class AllowedTermAccessor implements ControlValueAccessor {
    constructor(private host: AllowedTermComponent) { }

    writeValue(value: any): void {
        this.host.setValue(value);
    }

    /* tslint:disable:no-empty */
    @HostListener('valueChange')
    onChange = (_: any) => { }

    onTouched = () => { };
    /* tslint:enable:no-empty */

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
