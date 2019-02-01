import { Component } from '@angular/core';

import { ChangeFormService } from '../form.service';
import { ChangeForm } from '../shared/form.model';

@Component({
    selector: 'tm-project-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})

export class ChangeListComponent {
    list: ChangeForm[];

    constructor(private service: ChangeFormService) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.list = dto.map((d: any) => new ChangeForm(d));
    }
}
