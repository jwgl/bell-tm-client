import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestShowService } from './rest-show-service';
import { Http } from './http';

export class RestEditService extends RestShowService {
    constructor(public http: Http, public url: string, templateParams?: object) {
        super(http, url, templateParams);
    }

    loadDataForCreate<T>(params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http.get<T>(this.api.dataForCreate(), params);
    }

    loadItemForEdit<T>(id: any): Observable<T> {
        return this.http.get<T>(this.api.itemForEdit(id));
    }

    loadItemForRevise<T>(id: any): Observable<T> {
        return this.http.get(this.api.itemForRevise(id));
    }

    create<T>(value: any): Observable<T> {
        return this.http.post<{ id: T }>(this.api.list(), value).pipe(map(data => data.id));
    }

    update<T>(id: T, value: any): Observable<T> {
        return this.http.put(this.api.item(id), value).pipe(map(_ => id));
    }

    delete<T>(id: T): Observable<T> {
        return this.http.delete(this.api.item(id)).pipe(map(_ => id));
    }

    revise<T>(value: any): Observable<T> {
        return this.http.post<{ id: T }>(this.api.revise(), value).pipe(map(data => data.id));
    }
}
