import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { AwardForm } from '../../shared/form.model';
import { AwardFormService } from '../form.service';

@Component({
    templateUrl: 'item.component.html',
})
export class AwardItemComponent {
    vm: AwardForm;

    constructor(
        private route: ActivatedRoute,
        private service: AwardFormService,
    ) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe(dto => {
            this.vm = new AwardForm(dto);
        });
    }

    color(key: string) {
        return this.vm[key] ? 'btn btn-success' : 'btn btn-secondary';
    }

    // 超级开关：给超期申请的部分同学开的绿色通道
    toggle(key: string) {
        this.service.toggle(this.vm.id, key).subscribe(() => this.vm[key] = !this.vm[key]);
    }
}
