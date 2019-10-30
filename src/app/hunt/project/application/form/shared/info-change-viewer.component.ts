import { Component, Input } from '@angular/core';

import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { InfoChangeLabels } from '../../shared/constants';

@Component({
    selector: 'tm-info-change-simple-viewer',
    templateUrl: 'info-change-viewer.component.html',
})
export class InfoChangeSimpleViewerComponent {
    @Input() vm: any;

    toggle(subject: Subject<void>): void {
        subject.next();
    }

    getName(key: string): string {
        return key ? InfoChangeLabels[key] : null;
    }

    has(form: any, value: number): boolean {
        if (form) {
            return form.type.some((t: number) => t === value);
        } else {
            return false;
        }
    }
}
