import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';

@Injectable()
export class SubjectDirectorService extends RestShowService {
    constructor(
        http: Http,
        @Inject('SUBJECT_DIRECTOR_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl);
    }

    updateDirector(subjectId: string, directorId: string): Observable<void> {
        return this.http.put(this.api.item(subjectId), { directorId });
    }

    updateSecretary(subjectId: string, secretaryId: string): Observable<void> {
        return this.http.put(this.api.item(subjectId), { secretaryId });
    }
}
