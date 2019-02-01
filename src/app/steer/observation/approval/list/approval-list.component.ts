import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { CommonDialog } from 'core/common-dialogs';
import { CheckboxSelectorComponent } from 'core/common-directives';

import { ObservationItem } from '../../form/shared/form-list.model';
import { ApprovalService } from '../approval.service';

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class ApprovalListComponent {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;
    list: ObservationItem[];
    _list: ObservationItem[];
    terms: any[];
    _termId: number;
    activeTermId: number;
    filterSelected: any = {};
    counts: any;
    max = 999;

    options = [
        { label: '未发布', type: 'tobe', count: 0 },
        { label: '已发布', type: 'done', count: 0 },
    ];
    _mode: string;

    constructor(
        private route: ActivatedRoute,
        private service: ApprovalService,
        private dialog: CommonDialog) {
        const mode = this._mode = this.route.snapshot.data['mode'];
        this.loadData(null, mode);
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    set termId(termId: number) {
        this._termId = termId;
        this.loadData(termId, this._mode);
    }

    get termId(): number {
        return this._termId;
    }

    loadData(_termId: number, mode: string) {
        this.service.loadList({
            termId: this._termId ? this._termId.toString() : null,
            status: this.status ? this.status.toString() : null,
        }).subscribe((dto: any) => {
            this.list = this._list = dto.list;
            if (!this.terms) {
                this.terms = dto.term;
                this.activeTermId = this._termId = dto.activeTermId;
            }
            this.counts = dto.counts;
            this.options[0].count = this.counts.todo;
            this.options[1].count = this.counts.done;
        });
    }

    onFilterSelected(filter: any) {
        this.filterSelected = filter;
    }

    doFilter() {
        this.list = this._list.filter(item =>
            item.teacherName.indexOf(this.filterSelected.value) !== -1 ||
            item.course.indexOf(this.filterSelected.value) !== -1 ||
            item.departmentName.indexOf(this.filterSelected.value) !== -1 ||
            item.evaluateLevel === this.filterSelected.value,
        );
    }

    feedAll() {
        this.dialog.confirm('发布', '确定要发布吗？').then(() => {
            const list = this.selectors.filter(s => s.checked).map(s => s.data.id);
            if (list) {
                this.service.update(0, { ids: list }).subscribe(() => {
                    this.loadData(null, this._mode);
                });
            }
        });
    }

    get canFeed(): boolean {
        return (!this._mode || this._mode === 'tobe') && (this.activeTermId === this._termId);
    }

    get status(): number {
        return (this._mode && this._mode === 'done') ? 2 : 1;
    }
}
