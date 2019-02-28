import { Component } from '@angular/core';

import { ChangeForm } from '../form/shared/form.model';
import { CheckService } from './check.service';
@Component({
    templateUrl: 'check-item.component.html',
})
export class InfoChangeCheckItemComponent {
    form: ChangeForm;
    project: any;

    constructor(private service: CheckService) { }

    onItemLoaded(dto: any) {
        this.form = new ChangeForm(dto.form);
        this.project = dto.project;
    }
}
