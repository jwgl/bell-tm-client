import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Vision } from '../../shared/vision.model';
import { VisionPublicService } from '../vision-public.service';

/**
 * 培养方案（公共）。
 */
@Component({
    templateUrl: 'public-item.component.html',
})
export class VisionPublicItemComponent {
    vm: Vision;

    constructor(
        private route: ActivatedRoute,
        private service: VisionPublicService,
        private title: Title,
    ) {
        this.route.params.subscribe(params => {
            this.loadItem(parseInt(params['id'], 10));
        });
    }

    loadItem(id: number): void {
        this.service.loadItem(id).subscribe(dto => {
            this.vm = new Vision(dto);
            this.title.setTitle(`${this.vm.departmentName} - ${this.vm.title}`);
        });
    }
}
