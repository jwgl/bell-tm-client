import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'tm-project-select',
    styleUrls: ['project-select.component.scss'],
    templateUrl: 'project-select.component.html',
})
export class ProjectSelectComponent {
    @ViewChild('dropdown') dropdown: ElementRef;
    @Input() projects: any;
    @Output() selectProject: EventEmitter<any> = new EventEmitter<any>();

    project: any = {};

    projectSelected(project: any) {
        this.selectProject.emit(project);
        this.project = project;
    }

    get result(): string {
        if (!this.project || !this.project.name) {
            return '变更的项目';
        } else {
            return ` ${this.project.name}`;
        }
    }

    clearProject(): void {
        this.selectProject.emit(null);
    }
}
