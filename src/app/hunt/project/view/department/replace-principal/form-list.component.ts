import { Component } from '@angular/core';

import { ChangeFormService } from '../form.service';

@Component({
    selector: 'tm-project-list',
    templateUrl: 'form-list.component.html',
})

export class ChangeListComponent {
    list: any[];

    constructor(private service: ChangeFormService) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.list = dto;
    }
}
