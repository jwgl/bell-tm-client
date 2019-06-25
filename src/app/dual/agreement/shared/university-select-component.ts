import { Component, ElementRef, EventEmitter, AfterViewInit, Input, Output, ViewChild } from '@angular/core';

import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-university-select',
    styleUrls: ['university-select-component.scss'],
    templateUrl: 'university-select-component.html',
})
export class UniversitySelectComponent implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    @Input() universities: any[];
    @Output() selectUniversity: EventEmitter<any> = new EventEmitter<any>();

    filterUniversities: any[];
    university: any;

    selected(university: any) {
        this.selectUniversity.emit(university);
        this.university = university;
    }

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
            this.input.nativeElement.focus();
        });
        typeahead(this.input)
            .subscribe(value => this.filterUniversity(value));
    }

    get result(): string {
        if (!this.university) {
            return '合作大学';
        } else {
            return ` ${this.university.nameEn}`;
        }
    }

    clear(): void {
        this.selectUniversity.emit(null);
    }

    filterUniversity(value: string) {
        this.filterUniversities = this.universities.filter(item =>
            item.shortName === value || item.nameEn.indexOf(value) !== -1);
    }
}
