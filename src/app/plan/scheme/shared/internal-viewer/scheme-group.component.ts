import { Component, Input, HostBinding } from '@angular/core';

import { AbstractGroup, Direction, Property } from '../scheme.model';

/**
 * 小计
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tr[scheme-group]',
    templateUrl: 'scheme-group.component.html',
})
export class SchemeGroupComponent {
    @Input('scheme-group')
    group: AbstractGroup;

    @HostBinding('class')
    hostClass = 'group';

    get summary(): string {
        if (this.group instanceof Property) {
            if (this.group.isResidual) {
                const residual = this.group.scheme.directionResidualCredits;
                if (residual) {
                    return `小计${residual}`;
                } else {
                    return '小计';
                }
            } else {
                return '小计';
            }
        } else if (this.group instanceof Direction) {
            return `小计（${this.group.name}）`;
        } else {
            return null;
        }
    }
}
