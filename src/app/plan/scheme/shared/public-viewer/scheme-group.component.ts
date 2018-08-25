import { Component, Input, HostBinding } from '@angular/core';

import { AbstractGroup } from '../scheme.model';

/**
 * 小计。
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[scheme-group]',
    templateUrl: 'scheme-group.component.html',
})
export class SchemeGroupComponent {
    @Input('scheme-group')
    group: AbstractGroup;

    @HostBinding('class')
    hostClass = 'group';
}
