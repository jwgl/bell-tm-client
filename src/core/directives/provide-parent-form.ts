import { Directive } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Directive({
    selector: '[provideParentForm]',
    providers: [{
        provide: ControlContainer,
        useFactory: function (form: NgForm) {
            return form;
        },
        deps: [NgForm]
    }],
})
export class ProvideParentForm { }
