import { Component } from '@angular/core';

import * as _ from 'lodash';

import { ObserverTypes, StatusText } from '../../shared/constant';
import { ObservationFormService } from '../form.service';
import { ListFilter, ObservationItem } from '../shared/form-list.model';
import { Recommends } from '../shared/form.model';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class ObservationListComponent {
    list: ObservationItem[];
    listFilter = ListFilter;
    filterSelected: any = {};
    isAdmin: boolean;
    terms: number[];
    _termId: number;
    count: number;
    max = 10;
    pagerArgs: any;

    constructor(private service: ObservationFormService) {
        service.loadList({ termId: null }).subscribe((dto: any) => {
            this.isAdmin = dto.isAdmin;
            this.terms = dto.terms;
            this._termId = dto.activeTerm;
            service.list = dto.list;
            this.doFilter();
        });
        this.filterSelected = service.filterSelected;
    }

    loadData(offset: number) {
        this.pagerArgs = {offs: offset, max: this.max };
    }

    onFilterSelected(filterItem: any) {
        this.clearFilter();
        this.filterSelected.key = filterItem.key;
        this.filterSelected.name = filterItem.name;
        this.service.filterSelected = this.filterSelected;
    }

    set termId(value: number) {
        this._termId = value;
        this.service.loadList({ termId: value.toString() }).subscribe((dto: any) => {
            this.service.list = dto.list;
            this.service.offset = 0;
            this.doFilter();
        });
    }

    get termId(): number {
        return this._termId;
    }

    get reportUrl(): string {
        return this.service.api.list();
    }

    doFilter() {
        this.list = this.filterSelected.key
                  ? this.service.list.filter((item: any) => this.match(item))
                  : this.service.list;
        this.loadData(this.service.offset);
        this.count = this.list.length;
    }

    get unsubmitCount(): number {
        if (!this.list) {
            return 0;
        } else {
            const unsubmitList = this.list.filter(item => !item.status);
            return unsubmitList ? unsubmitList.length : 0;
        }
    }

    clearFilter() {
        this.service.offset = 0;
        this.filterSelected = {};
        this.doFilter();
    }

    match(item: any): boolean {
        let value = '';
        if (this.filterSelected.key === 'status') {
            value = StatusText[item.status];
        } else if (this.filterSelected.key === 'observerType') {
            value = ObserverTypes.map(data => data.name)[item.observerType - 1];
        } else if (this.filterSelected.key === 'recommend') {
            value = Recommends[item.recommend ? item.recommend : 0 ];
        } else {
            value = item[this.filterSelected.key];
        }
        return value.indexOf(this.filterSelected.value) !== -1;
    }

    get listLength(): number {
        return (this.pagerArgs.offs + this.max > this.count) ? this.count - this.pagerArgs.offs : this.max;
    }

    get offset(): number {
        if (this.pagerArgs.offs) {
            this.service.offset = this.pagerArgs.offs;
        }
        return this.service.offset;
    }
}
