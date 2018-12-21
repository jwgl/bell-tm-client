import { Component } from '@angular/core';

import { CheckService } from '../check.service';

@Component({
    template: `
    <div class="row" *ngIf="isCheckTime; else none">
        <div class="form-group col-md-2">
            <div class="list-group mt-3">
                <a [routerLink]="['../', 0, 'todo']" class="list-group-item list-group-item-action d-flex justify-content-between"
                    routerLinkActive="active">
                    检查
                </a>
                <a [routerLink]="['../', 1, 'todo']" class="list-group-item list-group-item-action d-flex justify-content-between"
                    routerLinkActive="active">
                    结项
                </a>
            </div>
        </div>
        <div class="form-group col-md-10">
            <router-outlet></router-outlet>
        </div>
    </div>
    <ng-template #none>
        <router-outlet></router-outlet>
    </ng-template>
    `,
})
export class CheckTypeComponent {
    constructor(private service: CheckService) { }

    get isCheckTime(): boolean {
        return this.service.isCheckTime;
    }
}
