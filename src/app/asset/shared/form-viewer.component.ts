import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-asset-viewer',
    templateUrl: 'form-viewer.component.html',
})
export class AssetViewerComponent {
    @Input() vm: any;
    host = 'http://es-test.bnuz.edu.cn/teacher?act=assetView';

    get qcode(): string {
        return `${this.host}&assetId=${this.vm.id}`;
    }
}
