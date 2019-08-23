import { Component } from '@angular/core';

import { Scheme } from '../shared/scheme.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class SchemeCheckItemComponent {
    form: Scheme;
    showDiff = true;

    onItemLoaded(dto: any) {
        this.form = new Scheme(dto.form);
    }
}
