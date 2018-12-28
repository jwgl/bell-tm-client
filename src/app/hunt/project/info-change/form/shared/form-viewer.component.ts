import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-change-form-viewer',
    templateUrl: 'form-viewer.component.html',
})
export class FormViewerComponent {
    @Input() vm: any;
    @Input() project: any;
    @Input() downloadUrl: string;

    has(item: any): boolean {
        return this.vm.type.some((t: number) => t === item.value);
    }
}
