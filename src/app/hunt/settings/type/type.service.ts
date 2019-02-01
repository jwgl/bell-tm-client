import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';

@Injectable()
export class TypeService extends RestEditService {

    constructor(
        http: Http,
        @Inject('SUBTYPE_API_URL') apiUrl: string,
        @Inject('PARENTTYPE_API_URL')
        private parenTypeApiUrl: string,
    ) {
        super(http, apiUrl);
    }

    save(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }

    loadParentTypes(): Observable<any> {
        return this.http.get(this.parenTypeApiUrl);
    }
}
