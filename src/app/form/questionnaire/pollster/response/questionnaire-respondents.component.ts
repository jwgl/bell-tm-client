import { Component, Input } from '@angular/core';
import { Questionnaire } from '../../shared/questionnaire-form.model';
import { QuestionnaireFormService } from '../questionnaire-form.service';

@Component({
    selector: 'tm-questionnaire-respondents',
    styleUrls: ['questionnaire-respondents.component.scss'],
    templateUrl: 'questionnaire-respondents.component.html',
})
export class QuestionnaireRespondentsComponent {
    @Input()
    questionnaire: Questionnaire;

    respondents: any[];
    showRespondents = false;

    constructor(private service: QuestionnaireFormService, ) { }

    onViewRespondents() {
        if (this.showRespondents) {
            this.showRespondents = false;
        } else {
            this.service.loadRespondents(this.questionnaire.id).subscribe(result => {
                this.respondents = result;
                this.showRespondents = true;
            });
        }
    }

    copyTable(table: HTMLTableElement) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(table);
        selection.addRange(range);
        document.execCommand('Copy');
        selection.removeAllRanges();
    }

    get supportCopy(): boolean {
        return !!document.createRange && !!window.getSelection;
    }
}
