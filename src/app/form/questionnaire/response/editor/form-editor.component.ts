import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';

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
    loading = false;
    toolbarInit = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ResponseFormService,
    ) {
        this.route.params.subscribe(params => {
            this.loading = true;
            this.service.loadData(params['hashId']).pipe().subscribe(dto => {
                this.form = new ResponseForm(dto);
                this.loading = false;
            }, error => {
                this.loading = false;
                alert(error);
            });
        });
    }

    ngAfterViewChecked(): void {
        if (!this.toolbarInit && this.form && this.bottomToolbar) {
            this.toolbarInit = true;
            const toolbar = this.bottomToolbar.nativeElement as HTMLElement;
            const rect = toolbar.getBoundingClientRect();
            if (rect.top <= (window.innerHeight || document.documentElement.clientHeight)) {
                toolbar.style.display = 'none';
            }
        }
    }

    onSave() {
        if (this.form.id) {
            this.update();
        } else {
            this.create(false);
        }
    }

    onSubmit() {
        const errors = this.form.validate();
        if (errors.length) {
            this.dialog.error(errors);
        } else {
            if (this.form.id) {
                this.submit();
            } else {
                this.create(true);
            }
        }
    }

    private create(submit: boolean) {
        this.saving = true;
        this.service.create(this.form.questionnaire.id, this.form.toServerDto(), submit).subscribe(dto => {
            if (submit) {
                this.router.navigate(['finish'], { relativeTo: this.route });
            } else {
                this.form = new ResponseForm(dto);
            }
            this.saving = false;
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    private update() {
        this.saving = true;
        this.service.update(this.form.questionnaire.id, this.form.toServerDto()).subscribe(dto => {
            this.form = new ResponseForm(dto)
            this.saving = false;
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    private submit() {
        this.saving = true;
        this.service.submit(this.form.questionnaire.id).subscribe(dto => {
            this.router.navigate(['finish'], { relativeTo: this.route });
            this.saving = false;
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }
}
