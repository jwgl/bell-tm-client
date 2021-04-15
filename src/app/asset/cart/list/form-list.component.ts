import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { CartService } from '../cart.service';
import { Asset } from '../../shared/asset-form.model';
import { CartNameDialog } from './cart-name.dialog';

@Component({
    templateUrl: 'form-list.component.html',
})
export class CartItemsComponent {
    assets: Asset[];
    name: string;
    history: any;
    assetsSelected: any[];
    ids = '';

    constructor(
        private service: CartService,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: Dialog,
    ) {
        this.service.loadList().subscribe(dto => this.loadData(dto));
    }

    loadData(dto: any) {
        this.assets = dto.list.map(it => new Asset(it));
    }

    onRowSelected(ids: any) {
        this.assetsSelected =
            this.assets.filter((asset: any) => ids.some(item => asset.id === item.id))
                .map(asset => asset.id);
        this.ids = this.assetsSelected.join('-');
    }

    create() {
        this.dialog.open(CartNameDialog).then(result => {
            this.service.create({ ids: this.assetsSelected, cartName: result.cartName}).subscribe(id =>
                this.router.navigate(['../history/', id], { relativeTo: this.route })
            );
        });
    }

    clear() {
        this.service.delete(0).subscribe(() => this.assets = []);
    }

    get href(): string {
        return `/api/asset/output?type=device&ids=${this.ids}`;
    }
}
