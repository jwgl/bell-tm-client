import {Component} from '@angular/core';

import {AgreementFormService} from '../form.service';
@Component({
    styleUrls: ['agreement-carryout-component.scss'],
    templateUrl: 'agreement-carryout-component.html',
})
export class AgreementCarryoutComponent {
    carryoutList: any[];

    constructor(private service: AgreementFormService) {
        this.loadData();
    }

    loadData() {
        this.service.loadCarryouts().subscribe(dto => this.carryoutList = dto);
    }

    filterBySubject(name: string) {
        return (carryoutInfo: any) => carryoutInfo.subjectName === name;
    }

    carryoutItem(item: any) {
        this.service.doCarryout({majorId: `${item.grade}${item.subjectId}`, regionName: item.regionName}).subscribe(() => this.loadData());
    }
}
