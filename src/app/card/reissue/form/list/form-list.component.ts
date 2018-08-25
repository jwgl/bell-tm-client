import { Component, OnInit } from '@angular/core';

import { ReissueFormService } from '../reissue-form.service';
import { forkJoin } from 'rxjs';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class ReissueFormListComponent implements OnInit {
    settings: { maxCount: number };
    warning: string = null;

    forms: any[];

    constructor(private service: ReissueFormService) { }

    ngOnInit(): void {
        forkJoin(this.service.loadSettings(), this.service.loadPicture()).subscribe(data => {
            this.settings = data[0];
            if (data[1]) {
                this.warning = data[1];
            } else {
                this.service.loadList().subscribe(forms => {
                    this.forms = forms;
                });
            }
        });
    }

    canApply() {
        return !this.warning
            && this.forms.length < this.settings.maxCount
            && (this.forms.length === 0 || this.forms.every(item => item.status === 'FINISHED'));
    }
}
