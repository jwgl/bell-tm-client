import { Component, ElementRef, AfterViewInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Http } from 'core/rest';
import { typeahead } from 'core/utils/typeahead';

@Component({
    selector: 'tm-place-select',
    styleUrls: ['common.shared.scss'],
    templateUrl: 'place-select.component.html',
})
export class PlaceSelectComponent implements AfterViewInit {
    @ViewChild('search', { static: true }) input: ElementRef;
    @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
    @Input() building: string;
    @Output() selectPlace: EventEmitter<any> = new EventEmitter<any>();

    places: any[];
    place: any = {};

    constructor(private http: Http) { }

    placeSelected(place: any) {
        this.selectPlace.emit(place);
        this.place = place;
    }

    ngAfterViewInit() {
        $(this.dropdown.nativeElement).on('shown.bs.dropdown', () => {
            this.input.nativeElement.focus();
        });
        typeahead(this.input).pipe(
            switchMap(value => this.findPlace(this.building, value))
        ).subscribe(value => this.places = value);
    }

    get result(): string {
        if (!this.place || !this.place.name) {
            return '教学场地';
        } else {
            return ` ${this.place.name}`;
        }
    }

    clearPlace(): void {
        this.place.name = null;
        this.selectPlace.emit(this.place);
    }

    findPlace(building: string, value: string): Observable<any[]> {
        let buildingQuery = '';
        if (building) { buildingQuery = `building=${encodeURIComponent(building)}&`; }
        return this.http.get(`/api/steer/places?${buildingQuery}q=${encodeURIComponent(value)}`);
    }
}
