import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Http } from 'core/rest';

@Injectable()
export class UnScheduleService {
    list: any[];
    constructor(
        private http: Http,
        @Inject('UNSCHEDULE_API_URL') private unschedulesApiUrl: string) {
    }

    loadDtoForCreate(taskId: string, teacherId: string): Observable<any> {
        return this.http.get(`${this.unschedulesApiUrl}/create?taskId=${taskId}&teacherId=${teacherId}`);
    }

    findTask(teacher: string): Observable<any> {
        return this.http.get(`${this.unschedulesApiUrl}/findtask?teacherId=${teacher}`);
    }

    create(value: any): Observable<string> {
        return this.http.post<{id: string}>(this.unschedulesApiUrl, value).pipe(
            map(data => data.id)
        );
    }

    update(id: any, value: any): Observable<string> {
        return this.http.put<{id: string}>(`${this.unschedulesApiUrl}/${id}`, value).pipe(
            map(res => id)
        );
    }
}
