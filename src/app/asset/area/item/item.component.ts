import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Asset } from '../../shared/asset-form.model';
import { AreaService } from '../area.service';

@Component({
    templateUrl: 'item.component.html',
})
export class AssetItemComponent {
    vm: Asset;
    changeLogs: any;
    constructor(
        private route: ActivatedRoute,
        private service: AreaService) {
        const params = this.route.snapshot.params;
        this.service.loadItem(params['id']).subscribe((dto: any) => {
            this.vm = new Asset(dto.form);
            this.changeLogs = dto.changeLogs;
        });
    }
}
