import { Component } from '@angular/core';

@Component({
    selector: 'tm-form-title',
    styles: [
        `h3 {
            text-align: center;
            text-decoration-line: underline;
            text-underline-position: under;
            text-decoration-style: double;
            margin-bottom: 1rem;
        }`,
    ],
    template: '<h3><ng-content></ng-content></h3>',
})
export class FormTitleComponent { }
