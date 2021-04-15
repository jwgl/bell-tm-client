import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Asset } from '../../shared/asset-form.model';
import { HistoryService } from '../cart-history.service';

@Component({
    templateUrl: 'item.component.html',
})
export class HistoryItemComponent {
    assets: Asset[];
    cartName: string;

    constructor(
        private route: ActivatedRoute,
        private service: HistoryService) {
        this.route.params.subscribe(params => {
            this.cartName = params['id'];
            this.service.loadItem(params['id']).subscribe((dto: any) => {
                if (dto) {
                    this.assets = dto.map(it => new Asset(it));
                }
            });
        });
    }

    get href(): string {
        return `/api/asset/output?type=device&cartName=${this.cartName}`;
    }
}
