import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tm-picture-viewer',
    styleUrls: ['picture-viewer.component.scss'],
    templateUrl: 'picture-viewer.component.html',
})
export class PictureViewerComponent {
    @Input()
    pictures: any;

    @Input()
    editable = false;

    @Input()
    pictureUrl: string;

    @Output()
    edit = new EventEmitter();

    onEdit() {
        this.edit.emit();
    }
}
