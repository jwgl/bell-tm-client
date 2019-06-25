import { Component } from '@angular/core';

import { ObservationFormService } from '../dean.service';
import { ObservationItem } from '../../form/shared/form-list.model';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class DeanListComponent {
    list: ObservationItem[];
    terms: number[];
    _termId: number;
    count: number;
    max = 10;
    pagerArgs: any;

    constructor(private service: ObservationFormService) {
        service.loadList({ termId: null }).subscribe((dto: any) => {
            this.terms = dto.terms;
            this._termId = dto.activeTerm;
            this.list = dto.list;
            this.loadData(0);
            this.count = this.list.length;
        });
    }

    loadData(offset: number) {
        this.pagerArgs = {offs: offset, max: this.max };
    }

    set termId(value: number) {
        this._termId = value;
        this.service.loadList({ termId: value.toString() }).subscribe((dto: any) => {
            this.list = dto.list;
            this.loadData(0);
            this.count = this.list.length;
        });
    }

    get termId(): number {
        return this._termId;
    }

    get listLength(): number {
        return (this.pagerArgs.offs + this.max > this.count) ? this.count - this.pagerArgs.offs : this.max;
    }

    get offset(): number {
        return this.pagerArgs.offs;
    }
}
