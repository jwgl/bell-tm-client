import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ScheduleService extends RestEditService {
    list: any[];
    constructor(
        http: Http,
        authService: AuthService,
        @Inject('OBSERVATION_FORM_API_URL') private apiUrl: string,
        @Inject('TEACHER_TIMESLOT_API_URL') private teacherTimeslotApiUrl: string,
        @Inject('PLACE_TIMESLOT_API_URL') private placeTimeslotApiUrl: string,
        @Inject('SCHEDULE_API_URL') private schedulesApiUrl: string) {
        super(http, schedulesApiUrl);
        this.apiUrl = this.apiUrl.replace('${userId}', authService.userInfo.id);
    }

    loadDataForCreate(): Observable<any> {
        return this.http.get(`${this.schedulesApiUrl}/create`);
    }

    loadList(options: {[key: string]: any} = {}): Observable<any> {
        return this.http.get(`${this.schedulesApiUrl}?${this.buildQueryString(options)}`);
    }

    findTeacherSchedule(teacherId: string): Observable<any[]> {
        return this.http.get<{schedules: any[]}>(
            `${this.teacherTimeslotApiUrl}/${teacherId}/timeslots`).pipe(
            map(data => data.schedules)
        );
    }

    findPlaceSchedule(place: string): Observable<any[]> {
        return this.http.get(`${this.placeTimeslotApiUrl}/${place}`);
    }

    getTerm(): Observable<any> {
        return this.http.get(`${this.apiUrl}/term`);
    }

    teacherActiveList(): Observable<any> {
        return this.http.get(`${this.apiUrl}/observationPriority`);
    }

    findTimeslot(teacherId: string, week: number, timeslotId: number): Observable<any[]> {
        return this.http.get(
            `${this.teacherTimeslotApiUrl}/${teacherId}/timeslots/${timeslotId}?week=${week}`);
    }

    buildQueryString(options: {[key: string]: string}): string {
        const search: string[] = [];
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                search.push(`${key}=${encodeURIComponent(options[key])}`);
            }
        }

        return search.join('&');
    }
}
