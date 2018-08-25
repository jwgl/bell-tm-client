import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Term, Timetable } from 'core/models';
import { ApiUrl, Http } from 'core/rest';

import { AttendanceDto, RollcallSettings } from './rollcall-form.model';
import { AuthService } from 'core/auth';

@Injectable()
export class RollcallFormService {
    term: Term;
    timetable: Timetable;
    settings: RollcallSettings;
    viewType: string;
    api: ApiUrl;

    constructor(
        private http: Http,
        @Inject('ROLLCALL_API_URL') private rollcallApiUrl: string,
        private authService: AuthService,
    ) {
        this.api = new ApiUrl(rollcallApiUrl, { userId: authService.userInfo.id });
    }

    loadList(): Observable<any> {
        return this.http.get(this.api.list());
    }

    loadRollcalls(timeslotId: number, week: number): Observable<any> {
        return this.http.get(this.getRollcallApi(timeslotId, week));
    }

    create(timeslotId: number, week: number, data: object): Observable<{ id: number, attendances: AttendanceDto }> {
        return this.http.post(this.getRollcallApi(timeslotId, week), data);
    }

    update(timeslotId: number, week: number, id: number, data: object): Observable<{ attendances: AttendanceDto }> {
        return this.http.put(`${this.getRollcallApi(timeslotId, week)}/${id}`, data);
    }

    delete(timeslotId: number, week: number, id: number): Observable<{ attendances: AttendanceDto }> {
        return this.http.delete(`${this.getRollcallApi(timeslotId, week)}/${id}`);
    }

    updateSettings(settings: RollcallSettings): Observable<void> {
        return this.http.put<void>(`${this.getSettingApi()}?type=settings`, settings).pipe(tap(() => {
            this.settings.hideFree = settings.hideFree;
            this.settings.hideLeave = settings.hideLeave;
            this.settings.hideCancel = settings.hideCancel;
            this.settings.random = settings.random;
        }));
    }

    updateViewType(viewType: string): Observable<void> {
        return this.http.put<void>(`${this.getSettingApi()}?type=view`, { view: viewType }).pipe(tap(() => {
            this.viewType = viewType;
        }));
    }

    private getRollcallApi(timeslotId: number, week: number): string {
        return `${this.api.item(timeslotId)}/weeks/${week}/rollcalls`;
    }

    private getSettingApi(): string {
        return `${this.api.list().replace('/timeslots', '/settings')}/rollcall`;
    }
}
