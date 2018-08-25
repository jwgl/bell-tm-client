import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';
import { Dialog } from 'core/dialogs';

import { BookingReportService } from '../booking-report.service';
import { BookingReport } from '../booking-report.model';
import { BookingFormSelectDialog } from './form-select.dialog';

@Component({
    templateUrl: 'report-editor.component.html',
})
export class BookingReportEditorComponent {
    editMode: EditMode;
    vm: BookingReport;
    saving = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: Dialog,
        private service: BookingReportService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.vm = BookingReport.create();
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit(params['id']).subscribe(dto => this.vm = BookingReport.fromDto(dto));
                    break;
            }
        });
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.vm.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.vm.id, this.vm.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    addItems() {
        this.dialog.open(BookingFormSelectDialog, { report: this.vm }).then((results: any[]) => {
            results.forEach(item => this.vm.addItem(item));
        });
    }

    removeItem(formId: number) {
        this.vm.removeItem(formId);
    }
}
