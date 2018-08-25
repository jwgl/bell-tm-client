import { Component, EventEmitter, Input, Output, SimpleChange, OnInit, OnChanges, forwardRef } from '@angular/core';
import { FormArray, FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { getBit, setBit } from 'core/utils';

@Component({
    selector: 'tm-allowed-term',
    templateUrl: 'allowed-term.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AllowedTermComponent), multi: true }],
})
export class AllowedTermComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input()
    value: number;

    @Input()
    suggestedTerm: number;

    @Input()
    terms: number[];

    controls: FormArray;

    constructor() {
    }

    ngOnInit() {
        this.controls = new FormArray(this.terms.map(term => new FormControl({
            value: getBit(this.value, term - 1),
            disabled: this.suggestedTerm === term,
        })));

        this.controls.valueChanges.subscribe((values: boolean[]) => {
            // 被禁用的控件的值未包含在values中
            values.splice(this.terms.indexOf(this.suggestedTerm), 0, true);
            this.setValue(values.reduce((prev, curr, i) => curr ? setBit(prev, this.terms[i] - 1) : prev, 0));
        });
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        const suggestedTermChange = changes['suggestedTerm'];
        if (suggestedTermChange && !suggestedTermChange.isFirstChange()) {
            this.terms.forEach((term, i) => {
                const control = this.controls.at(i);
                if (suggestedTermChange.currentValue === term) {
                    control.disable();
                } else {
                    control.enable();
                }
            });

            this.setValue(setBit(0, suggestedTermChange.currentValue - 1));
        }
    }

    setValue(value: number) {
        this.value = value;
        this.terms.forEach((term, i) => this.controls.at(i).setValue(getBit(this.value, term - 1), { emitEvent: false }));
        this.onChange(this.value);
    }

    writeValue(value: any): void {
        this.setValue(value);
    }

    onChange = (_: any) => { };
    onTouched = () => { };

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
