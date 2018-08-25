import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';

import { Place, PlaceUsage } from './place-usage.model';

@Injectable()
export class PlaceUsageService extends RestShowService {
    constructor(
        http: Http,
        @Inject('PLACE_USAGE_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl);
    }

    loadPlaces(building: string): Observable<Place[]> {
        return this.http.get(`${this.api.item(building)}/places`);
    }

    loadUsage(building: string, placeId: string): Observable<PlaceUsage[]> {
        return this.http.get(`${this.api.item(building)}/places/${placeId}/usages`);
    }
}
