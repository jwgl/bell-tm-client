import { Component, OnInit } from '@angular/core';

import { VisionFormService } from '../vision-form.service';

/**
 * 所有者培养方案列表。
 */
@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class VisionFormListComponent implements OnInit {
    subjects: any[];

    constructor(private service: VisionFormService) { }

    ngOnInit(): void {
        this.service.loadList().subscribe(data => this.subjects = data);
    }
}
