import { Component, Input, HostBinding } from '@angular/core';

import { Property } from '../../shared/scheme.model';

/**
 * 课程性质
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tr[scheme-property]',
    styles: [
        ':host { background-color: #ddd; }',
        'td.name { text-align: left; padding: 0.25rem;}',
    ],
    templateUrl: 'scheme-property.component.html',
})
export class SchemePropertyToesComponent {
    @Input('scheme-property')
    property: Property;

    @HostBinding('class')
    hostClass = 'property';
}
