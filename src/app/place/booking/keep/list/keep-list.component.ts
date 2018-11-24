import { Component } from '@angular/core';
import * as _ from 'lodash';

import { Reusable } from 'core/route';

import { BookingKeepService } from '../booking-keep.service';
import { Place } from '../booking-keep.model';

@Reusable()
@Component({
    styleUrls: ['keep-list.component.scss'],
    templateUrl: 'keep-list.component.html',
})
export class BookingKeepListComponent {
    term: { startWeek: number, maxWeek: number };
    buildings: string[];
    places: Place[];
    weeks: number[];
    days: number[];
    bookings: any[];

    params: { [param: string]: string };

    constructor(private service: BookingKeepService) {
        this.service.loadBuildings().subscribe(result => {
            this.buildings = result.buildings;
            this.term = result.term;

            this.weeks = [];
            for (let w = this.term.startWeek; w <= this.term.maxWeek; w++) {
                this.weeks.push(w);
            }

            this.days = [];
            for (let d = 1; d <= 7; d++) {
                this.days.push(d);
            }

            this.params = {
                building: null,
                place: null,
                week: null,
                day: null,
                section: null,
            };
        });
    }

    buildingChanged(building: string) {
        this.params.place = null;
        this.service.loadPlaces(building).subscribe(places => {
            this.places = places;
        });
    }

    search() {
        this.service.loadList(_.omitBy(this.params, _.isNil)).subscribe(result => {
            this.bookings = result;
        });
    }

    reset() {
        this.params = {
            building: this.params.building,
            place: null,
            week: null,
            day: null,
            section: null,
        };
    }
}
