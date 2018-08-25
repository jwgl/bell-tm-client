import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs';

import { FreeListenSettings } from '../../shared/free-listen-form.model';
import { FreeListenFormService } from '../free-listen-form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class FreeListenFormListComponent implements OnInit {
    settings: FreeListenSettings;
    notice: string;

    forms: any[];
    totalCount: number;
    max = 10;

    constructor(private service: FreeListenFormService) { }

    ngOnInit(): void {
        forkJoin(this.service.loadSettings(), this.service.loadNotice()).subscribe(data => {
            this.settings = new FreeListenSettings(data[0]);
            this.notice = data[1];
            this.loadList(0);
        });
    }

    loadList(offset: number) {
        this.service.loadListByPage(offset, this.max).subscribe(data => {
            this.totalCount = data.totalCount;
            this.forms = data.items;
        });
    }
}
