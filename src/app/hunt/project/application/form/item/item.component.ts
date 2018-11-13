import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubmitOptions } from 'core/workflow';

import { ProjectFormService } from '../form.service';
import { ProjectForm } from '../shared/form.model';

@Component({
    templateUrl: 'item.component.html',
})
export class ProjectItemComponent {
    vm: ProjectForm;

    constructor(
        private route: ActivatedRoute,
        private service: ProjectFormService,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.vm.id,
            type: 'check',
            what: this.vm.name,
        };
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = new ProjectForm(dto);
        });
    }

    get editAble(): boolean {
        return (this.vm.status === 'CREATED' || this.vm.status === 'REJECTED') && this.vm.isValidDate;
    }
}
