import { Component, Input } from '@angular/core';

import { Scheme } from '../scheme.model';

/**
 * 汇总行
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[scheme-summary]',
    styles: [':host {background-color: #e8e8e8}'],
    templateUrl: 'scheme-summary.component.html',
})
export class SchemeSummaryComponent {
    @Input('scheme-summary') scheme: Scheme;
}
