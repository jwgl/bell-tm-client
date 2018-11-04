import { Component, Input, Output, EventEmitter } from '@angular/core';

import { QuestionOption } from '../../shared/questionnaire-form.model';

@Component({
    selector: 'tm-ballot-option-viewer',
    styleUrls: ['ballot-option-viewer.component.scss'],
    templateUrl: 'ballot-option-viewer.component.html',
})
export class BallotOptionViewerComponent {
    @Input()
    option: QuestionOption;

    @Output()
    edit = new EventEmitter();

    @Output()
    remove = new EventEmitter();

    onEdit() {
        this.edit.emit(this.option);
    }

    onRemove() {
        this.remove.emit(this.option);
    }
}
