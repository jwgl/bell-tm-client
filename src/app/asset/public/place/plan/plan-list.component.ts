import { Component } from '@angular/core';

import { Room } from '../../../place/shared/form.model';
import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'plan-list.component.html',
})
export class PlanListComponent {
    rooms: any[];
    queryOptions: any;
    labels: any = [];
    terms: any;
    labelSelected: any[];

    constructor(private service: RoomFormService) {
        this.loadData(null);
        this.queryOptions = {
            forPlan: true,
        };
    }

    loadData(options: any) {
        this.service.loadList(options).subscribe((dto: any) => {
            this.rooms = dto.rooms ? dto.rooms.map(it => new Room(it)) : null;
            this.labels = dto.labels ? dto.labels.map(it => ({
                id: it.id,
                fullName: `${it.business}-${it.type}-${it.labelName}`
            })) : null;
            this.terms = dto.terms;
        });
    }

    query() {
        if (!this.queryOptions.termId) {
            alert('请选择学期');
        } else {
            this.queryOptions.labels = this.toId(this.labelSelected);
            this.loadData(this.queryOptions);
        }
    }

    toId(object: any): any {
        return object ? object.map(o => o.id) : null;
    }

    termText(id: number): string {
        return id > 0 ? `${Math.floor(id / 10)}-${Math.floor(id / 10) + 1}-${id % 10}` : null;
    }
}
