import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dialog } from 'core/dialogs';

import { Asset } from '../../shared/asset-form.model';
import { CenterService } from '../center.service';
import { AssetEditorDialog } from './asset-editor.dialog';

@Component({
    templateUrl: 'item.component.html',
})
export class AssetItemComponent {
    vm: Asset;
    changeLogs: any;
    suppliers: any[];

    constructor(
        private route: ActivatedRoute,
        private dialog: Dialog,
        private service: CenterService) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe((dto: any) => {
            this.vm = new Asset(dto.form);
            this.changeLogs = dto.changeLogs;
            this.suppliers = dto.suppliers;
        });
    }

    edit() {
        this.dialog.open(AssetEditorDialog, {
            form: this.vm,
            suppliers: this.suppliers,
        }).then(result =>
            this.service.update(this.vm.id, result).subscribe(() => this.loadData(this.vm.id))
        );
    }
}
