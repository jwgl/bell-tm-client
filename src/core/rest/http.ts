import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Http {
    private commonHeaders = new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    });

    private commonOptions = {
        headers: this.commonHeaders,
    };

    constructor(private http: HttpClient) { }

    get<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http.get<T>(url, this.buildOptions(params));
    }

    getResponse<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<HttpResponse<T>> {
        return this.http.get<T>(url, {...this.buildOptions(params), observe: 'response'});
    }

    post<T>(url: string, data: object, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        this.deleteEmptyProperties(data);
        return this.http.post<T>(url, data, this.buildOptions(params));
    }

    put<T>(url: string, data: object, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        this.deleteEmptyProperties(data);
        return this.http.put<T>(url, data, this.buildOptions(params));
    }

    patch<T>(url: string, data: object, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        this.deleteEmptyProperties(data);
        return this.http.patch<T>(url, data, this.buildOptions(params));
    }

    delete<T>(url: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
        return this.http.delete<T>(url, this.buildOptions(params));
    }

    private buildOptions(params?: HttpParams | { [param: string]: string | string[] }): {
        headers?: HttpHeaders | {[header: string]: string | string[]};
        params?: HttpParams | { [param: string]: string | string[] };
    } {
        if (!!params) {
            return {
                headers: this.commonHeaders,
                params: params,
            };
        } else {
            return this.commonOptions;
        }
    }

    private deleteEmptyProperties(data: any) {
        for (const i in data) {
            if (data[i] === null || data[i] === undefined) {
                delete data[i];
            } else if (typeof data[i] === 'object') {
                this.deleteEmptyProperties(data[i]);
            }
        }
    }
}
