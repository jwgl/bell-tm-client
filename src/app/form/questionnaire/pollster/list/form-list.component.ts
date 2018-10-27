import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionnaireFormService } from '../questionnaire-form.service';
import { CreateOptionDialogService } from './create-option/create-option.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class QuestionnaireFormListComponent implements OnInit {
    forms: any[];
    totalCount: number;
    max = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: QuestionnaireFormService,
        private createOptionDialog: CreateOptionDialogService,
    ) { }

    ngOnInit(): void {
        this.loadList(0);
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
        });
    }

    onCreate() {
        this.createOptionDialog.open({}).then(result => {
            this.router.navigate(['create', result], { relativeTo: this.route });
        });
    }
}
