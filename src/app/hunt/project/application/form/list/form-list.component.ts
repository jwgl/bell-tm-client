import { Component } from '@angular/core';

import { ProjectFormService} from '../form.service';
import { ProjectForm } from '../shared/form.model';

@Component({
    templateUrl: 'form-list.component.html',
})

export class ProjectListComponent {
    list: any[];

    constructor(private service: ProjectFormService) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any[]) {
        this.list = dto;
    }
}
