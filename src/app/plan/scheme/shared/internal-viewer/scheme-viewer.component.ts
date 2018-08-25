import { Component, Input, HostBinding } from '@angular/core';

import { Scheme } from '../scheme.model';

/**
 * 查看器
 */
@Component({
    selector: 'tm-scheme-viewer',
    styleUrls: ['scheme-viewer.component.scss'],
    templateUrl: 'scheme-viewer.component.html',
})
export class SchemeViewerComponent {
    @Input() scheme: Scheme;

    @HostBinding('class.show-diff')
    @Input() showDiff: boolean;
}
