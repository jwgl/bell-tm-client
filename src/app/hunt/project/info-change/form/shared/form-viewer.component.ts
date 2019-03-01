import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-change-form-viewer',
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;
    @Input() project: any;

    has(item: any): boolean {
        return this.vm.type.some((t: number) => t === item.value);
    }

    get downloadUrl(): string {
        return `/api/hunt/attachments/${this.vm ? this.vm.id : ''}?type=INFO-CHANGE`;
    }
}
