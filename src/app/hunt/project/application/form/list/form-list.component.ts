import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-project-list',
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})

export class ProjectListComponent {
    @Input() list: any[];
}
