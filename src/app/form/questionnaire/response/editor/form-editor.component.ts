import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ResponseFormService } from '../response-form.service';
import { ResponseForm } from '../../shared/response-form.model';
import './form-editor.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class ResponseFormEditorComponent implements AfterViewChecked {
    @ViewChild('bottomToolbar') bottomToolbar: ElementRef;

    form: ResponseForm;
    saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: ResponseFormService,
    ) {
        this.route.params.subscribe(params => {
            this.service.loadData(params['hashId']).subscribe(dto => this.form = new ResponseForm(dto));
        });
    }

    save() {
        if (this.form.id) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.form.questionnaire.id, this.form.toServerDto()).subscribe(dto => {
            this.form = new ResponseForm(dto);
            this.saving = false;
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.questionnaire.id, this.form.toServerDto()).subscribe(dto => {
            this.form = new ResponseForm(dto)
            this.saving = false;
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    ngAfterViewChecked(): void {
        if (this.form) {
            const toolbar = this.bottomToolbar.nativeElement as HTMLElement;
            const rect = toolbar.getBoundingClientRect();
            if (rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
                toolbar.style.display = 'none';
            }
        }
    }
}
