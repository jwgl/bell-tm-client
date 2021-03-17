import { Component } from '@angular/core';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';

import { FundImportDialog } from './editor/form-editor.component';
import { FundService } from './fund.service';

@Component({
    templateUrl: 'fund-list.component.html',
})
export class FundListComponent {
    funds: any[];
    form: any;
    fundType = 'ARRANGEMENT';
    reviewAble = false;
    monthCreated = null;
    monthes: any[];
    list: any[];

    constructor(
        private service: FundService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        this.loadData();
    }

    loadData() {
        this.service.loadList({month: this.monthCreated, fundType: this.fundType}).subscribe((dto: any) => {
            this.monthes = dto.monthes ? dto.monthes.sort() : [];
            this.list = dto.funds;
            if (this.list && this.list.length > 0) {
                this.funds = this.list.reduce((rows: any[], item, index) => {
                    const array = _.fill(Array(11), 0)
                                    .map((v, i) => i > 1 ? item[`col${i - 1}`] : v);
                    array[0] = index + 1;
                    array[1] = item.code;
                    rows.push(array);
                    return rows;
                }, []);
            }
        });
    }

    importFund() {
        this.dialog.open(FundImportDialog).then(form => {
            const data = form.data.split('\n');
            this.funds = [];
            const table = [];
            this.reviewAble = true;
            data.forEach((row: string, index: number) => {
                if (!row.startsWith('序号') && row !== '') {
                    const cells = row.split('\t');
                    cells.forEach((item, i) => {
                        if (i > 1 && item !== '' && !/^\d+(\.\d+)?$/.test(item)) {
                            alert(`第${index + 1}行存在非法值‘${item}’`);
                            this.reviewAble = false;
                        }
                    });
                    this.funds.push(cells);
                    table.push({data: cells});
                }
            });
            this.form = form;
            this.form.table = table;
        });
    }

    ok() {
        this.service.batchSave(this.form).subscribe(dto => {
            if (dto.error && dto.error.length > 0) {
                this.dialogs.error(dto.error);
            }
            if (dto.success > 0) {
                alert(`成功导入${dto.success}行数据`);
            }
            this.reviewAble = false;
        });
    }
    cancel() {
        this.form = null;
        this.funds = [];
        this.reviewAble = false;
    }
    search() {
        this.loadData();
    }
}
