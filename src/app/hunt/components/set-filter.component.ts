import { Component, ViewChild, ViewContainerRef } from '@angular/core';

import * as _ from 'lodash';

import { IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams, RowNode } from 'ag-grid-community';
import { IFilterAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'set-filter',
    templateUrl: 'set-filter.component.html',
    styleUrls: ['set-filter.component.scss'],
})
export class SetFilterComponent implements IFilterAngularComp {
    private params: IFilterParams;
    private valueGetter: (rowNode: RowNode) => any;
    items = [];
    filters = [];

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }

    isFilterActive(): boolean {
        return this.filters !== null && this.filters.length > 0;
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        return this.filters
            .some((filterWord) => {
                return this.valueGetter(params.node) === filterWord;
            });
    }

    getModel(): any {
        return { value: this.filters };
    }

    setModel(model: any): void {
        this.filters = model ? model.value : [];
    }

    setItems(items: any[]) {
        this.items = items;
    }

    select(item: string) {
        const removedItem = this.filters.find(f => f === item);
        if (removedItem) {
            this.filters.splice(this.filters.indexOf(removedItem), 1);
        } else {
            this.filters.push(item);
        }
        this.params.filterChangedCallback();
    }

    notSelected() {
        return _.difference(this.items, this.filters);
    }

    selectAll() {
        this.filters = this.filters.length > 0 ? [] : this.items.slice();
        this.params.filterChangedCallback();
    }
}
