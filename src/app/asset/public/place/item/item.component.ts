import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Room } from '../../../place/shared/form.model';
import { RoomFormService } from '../form.service';

@Component({
    templateUrl: 'item.component.html',
})
export class PlaceItemComponent {
    vm: Room;
    createAble: boolean;
    labels: any;
    labelTypes: any;

    constructor(
        private route: ActivatedRoute,
        private service: RoomFormService,
    ) {
        const params = this.route.snapshot.params;
        this.loadData(params['id']);
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe((dto: any) => {
            this.vm = new Room(dto.form);
            this.createAble = dto.createAble;
            this.labels = dto.labels ? dto.labels : [];
            this.labelTypes = dto.labelTypes ? dto.labelTypes : [];
        });
    }
}
