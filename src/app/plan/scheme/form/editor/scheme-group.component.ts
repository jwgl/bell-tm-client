import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';

import { AbstractGroup, Direction, Property } from '../../shared/scheme.model';

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

    @Output()
    add = new EventEmitter<AbstractGroup>();

    @Output()
    import = new EventEmitter<AbstractGroup>();

    @HostBinding('class')
    hostClass = 'group';

    get summary(): string {
        if (this.group instanceof Property) {
            const property = this.group as Property;
            if (property.isResidual) {
                const residual = property.scheme.directionResidualCredits;
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
