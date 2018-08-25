import { Component, Input } from '@angular/core';

import { Scheme } from '../scheme.model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[scheme-summary]',
    styles: [':host {background-color: #ddd}'],
    templateUrl: 'scheme-summary.component.html',
})
export class SchemeSummaryComponent {
    @Input('scheme-summary') scheme: Scheme;
}
