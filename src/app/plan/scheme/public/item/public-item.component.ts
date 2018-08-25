import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Scheme, SchemeDto } from '../../shared/scheme.model';
import { SchemePublicService } from '../scheme-public.service';

import '../../shared/public-viewer/scheme-viewer.model';

/**
 * 教学计划（公共）。
 */
@Component({
    templateUrl: 'public-item.component.html',
})
export class SchemePublicItemComponent {
    vm: Scheme;

    constructor(
        private route: ActivatedRoute,
        private service: SchemePublicService,
        private title: Title,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number): void {
        this.service.loadItem<SchemeDto>(id).subscribe(dto => {
            this.vm = new Scheme(dto);
            this.vm.normalize();
            this.title.setTitle(`${this.vm.departmentName} - ${this.vm.title}`);
        });
    }
}
