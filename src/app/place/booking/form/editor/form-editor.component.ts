import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EditMode } from 'core/constants';

import { BookingForm, BookingSection, bookingSectionMap, BookingType, Department } from '../../shared/booking-form.model';
import { BookingFormService } from '../booking-form.service';
import { FindPlaceDialogService } from './find-place/find-place.service';
import './form-editor.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class BookingFormEditorComponent {
    form: BookingForm;
    departments: Department[];
    bookingTypes: BookingType[];
    findPlaceOptions: any = {};
    saving = false;
    maxCount = 8;

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
        this.form.department = this.departments.find(it => it.id === dto.form.departmentId);
        this.bookingTypes = dto.bookingTypes;
        if (!this.form.id) {
            this.form.bookingType = this.bookingTypes[0];
        } else {
            this.form.bookingType = this.bookingTypes.find(it => it.id === dto.form.bookingTypeId);
        }
        this.findPlaceOptions.term = dto.term;
        this.findPlaceOptions.placeTypes = dto.placeTypes;
        this.findPlaceOptions.sections = dto.sections;
        this.findPlaceOptions.bookingDays = dto.bookingDays;
        this.findPlaceOptions.today = dto.today;
        this.findPlaceOptions.form = this.form;
    }

    onDepartmentChanged(department: Department) {
        this.service.getDepartmentBookingType(department.id).subscribe(bookingTypes => {
            this.bookingTypes = bookingTypes;
            this.form.bookingType = this.bookingTypes[0];
        });
    }

    findPlace() {
        this.findPlaceDialog.open(this.findPlaceOptions).then((places: any[]) => {
            for (let i = 0; i < places.length; i++) {
                if (this.form.items.length < this.maxCount) {
                    this.form.addItem(places[i]);
                } else {
                    setTimeout(() => {
                        alert(`借用多于${this.maxCount}项。`);
                    }, 10);
                    break;
                }
            }
        });
    }

    onSubmit() {
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
