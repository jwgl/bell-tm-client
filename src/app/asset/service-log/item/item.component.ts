import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServiceLogForm } from '../form.model';
import { ServiceLogFormService } from '../form.service';

@Component({
    templateUrl: 'item.component.html',
})
export class ServiceLogItemComponent {
    vm: ServiceLogForm;
    createAble: boolean;
    userId: string;
    assets: any[];

    constructor(
        private route: ActivatedRoute,
        private service: ServiceLogFormService,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe((dto: any) => {
            this.vm = new ServiceLogForm(dto.form);
            this.createAble = dto.createAble;
            this.assets = dto.assets;
        });
    }
}
