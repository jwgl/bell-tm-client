import { Observable } from 'rxjs';

import { ApiUrl } from './api-url';
import { Http } from './http';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

export class RestShowService {
    api: ApiUrl;

    constructor(protected http: Http, protected url: string, templateParams?: object) {
        this.api = new ApiUrl(url, templateParams);
    }

    loadList<T>(params?: { [param: string]: string | string[] }): Observable<T[]> {
        return this.http.get<T[]>(this.api.list(), params);
    }

    loadListByPage<T>(offset: number, max: number, params?: { [param: string]: string | string[] })
        : Observable<{ items: T[], totalCount: number }> {
        return this.http.getResponse<T[]>(this.api.list(), { offset: `${offset}`, max: `${max}`, ...params }).pipe(
            map(rep => ({
                items: rep.body,
                totalCount: this.getTotalCountHeader(rep),
            }))
        );
    }

    loadItem<T>(id: any): Observable<T> {
        return this.http.get<T>(this.api.item(id));
    }

    private getTotalCountHeader(response: HttpResponse<any>): number {
        const xTotalCount = response.headers.get('X-Total-Count');
        if (xTotalCount) {
            return parseInt(xTotalCount, 10);
        } else {
            throw new Error('Response does not contains header X-Total-Count.');
        }
    }
}
