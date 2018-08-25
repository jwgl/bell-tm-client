import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

import { SchemeCourseDto } from '../shared/scheme.model';

@Injectable()
export class SchemeFormService extends RestEditService {
    private importSchemeApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('SCHEME_FORM_API_URL') apiUrl: string,
        authService: AuthService,
        @Inject('SCHEME_IMPORT_API_URL') schemeImportApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.importSchemeApi = new ApiUrl(schemeImportApiUrl);
    }

    loadPropertyCourses(id: string, propertyId: number): Observable<SchemeCourseDto[]> {
        return this.http.get(`${this.importSchemeApi.item(id)}/properties/${propertyId}/courses`);
    }

    loadDirectionCourses(id: string, directionId: number): Observable<SchemeCourseDto[]> {
        return this.http.get(`${this.importSchemeApi.item(id)}/directions/${directionId}/courses`);
    }

    findCourses(query: string, type: number, propertyId: number): Observable<any> {
        return this.http.get(`${this.api.list()}/courses?q=${encodeURIComponent(query)}&t=${type}&p=${propertyId}`);
    }
}
