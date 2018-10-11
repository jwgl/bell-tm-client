import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { BookingForm, BookingSection, bookingSectionMap } from '../../shared/booking-form.model';
import { BookingFormService } from '../booking-form.service';
import { FindPlaceDialogService } from './find-place/find-place.service';
import './form-editor.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class BookingFormEditorComponent {
    form: BookingForm;
    departments: any[];
    bookingTypes: any[];
    findPlaceOptions: any = {};
    saving = false;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: BookingFormService,
        private findPlaceDialog: FindPlaceDialogService,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
                    break;
            }
        });
    }

    onLoadData(dto: any) {
        dto.sections.forEach((section: BookingSection) => bookingSectionMap[section.id] = section);
        this.form = new BookingForm(dto.form);
        this.departments = dto.departments;
        this.bookingTypes = dto.bookingTypes;
        this.findPlaceOptions.term = dto.term;
        this.findPlaceOptions.placeTypes = dto.placeTypes;
        this.findPlaceOptions.sections = dto.sections;
        this.findPlaceOptions.bookingDays = dto.bookingDays;
        this.findPlaceOptions.today = dto.today;
        this.findPlaceOptions.form = this.form;
    }

    onDepartmentChanged(departmentId: string) {
        this.service.getDepartmentBookingType(departmentId).subscribe(bookingTypes => {
            this.bookingTypes = bookingTypes;
            this.form.bookingTypeId = this.bookingTypes[0].id;
        });
    }

    findPlace() {
        this.findPlaceDialog.open(this.findPlaceOptions).then((places: any[]) => {
            places.forEach(place => {
                this.form.addItem(place);
            });
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
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../', id], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['../'], { relativeTo: this.route });
        }, error => {
            this.saving = false;
            alert(error.message);
        });
    }
}
