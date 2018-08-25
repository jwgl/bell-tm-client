import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Scheme, SchemeDto } from '../../shared/scheme.model';
import { SchemeAdminService } from '../scheme-admin.service';

@Component({
    templateUrl: 'admin-item.component.html',
})
export class SchemeAdminItemComponent {
    vm: Scheme;

    constructor(
        private route: ActivatedRoute,
        private service: SchemeAdminService,
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
