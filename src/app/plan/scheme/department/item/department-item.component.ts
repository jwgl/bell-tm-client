import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Scheme, SchemeDto } from '../../shared/scheme.model';
import { SchemeDepartmentService } from '../scheme-department.service';

@Component({
    templateUrl: 'department-item.component.html',
})
export class SchemeDepartmentItemComponent {
    vm: Scheme;

    constructor(
        private route: ActivatedRoute,
        private service: SchemeDepartmentService,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number): void {
        this.service.loadItem<SchemeDto>(id).subscribe(dto => {
            this.vm = new Scheme(dto);
        });
    }
}
