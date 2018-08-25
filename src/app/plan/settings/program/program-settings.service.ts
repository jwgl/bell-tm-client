import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestShowService } from 'core/rest';

@Injectable()
export class ProgramSettingsService extends RestShowService {
    constructor(
        http: Http,
        @Inject('PROGRAM_SETTINGS_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl);
    }

    loadListByGrade(grade: number): Observable<any[]> {
        if (grade !== 0) {
            return this.loadList({grade: `${grade}`});
        } else {
            return this.loadList();
        }
    }

    loadGrades(): Observable<any[]> {
        return this.http.get(`${this.api.list()}/grades`);
    }

    update(programId: number, options: any): Observable<void> {
        return this.http.put(this.api.item(programId), options);
    }
}
