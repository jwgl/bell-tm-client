import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import * as _ from 'lodash';

interface Thead {
    id: string;
    label: string;
    order?: boolean;
}

@Component({
    selector: 'tm-grid',
    styleUrls: ['table.component.scss'],
    templateUrl: 'table.component.html',
})
export class TmGridComponent {
    @Input()
    theads: Thead[];
    baseList: any[];
    list: any[];
    @ContentChild('bodyTpl') bodyTemplate: TemplateRef<any>;
    direction = 1;
    orderKey: string;
    filters = [];
    @Input()
    checkAble: boolean;
    @Output()
    checkedList = new EventEmitter<any>();

    @Input() set form(value: any[]) {
        this.baseList = value;
        this.list = value;
    }

    orderBy(col: Thead) {
        if (col.order) {
            this.list.sort((a, b) => String(a[col.id]).localeCompare(String(b[col.id])) * this.direction);
            this.direction = -this.direction;
            this.orderKey = col.id;
        }
    }

    select(id: string, item: string) {
        const col = this.filters.find(f => f.id === id);
        if (col) {
            const removedItem = col.items.find(i => i === item);
            if (removedItem) {
                col.items.splice(col.items.indexOf(removedItem), 1);
                if (col.items.length === 0) {
                    this.filters.splice(this.filters.indexOf(col), 1);
                }
            } else {
                col.items.push(item);
            }
        } else {
            const items = [];
            items.push(item);
            this.filters.push({ id, items });
        }
        this.doFilter();
    }

    isSelected(id: string, item: string) {
        const col = this.filters.find(f => f.id === id);
        if (col) {
            return col.items.some((i: string) => i === item);
        } else {
            return false;
        }
    }

    hasFilter(id: string) {
        return this.filters.some(f => f.id === id);
    }

    filterBySelected(id: string, selected: boolean) {
        return (item: string) => {
            const col = this.filters.find(f => f.id === id);
            if (selected) {
                return col && col.items.some((i: string) => i === item);
            } else {
                return !col || !col.items.some((i: string) => i === item);
            }
        };
    }

    clearFilter(id: string) {
        this.filters = this.filters.filter(f => f.id !== id);
        this.doFilter();
    }

    checkAll(checked: boolean) {
        this.list.forEach(checkbox => checkbox.checked = checked);
    }

    selectAll(id: string) {
        const col = this.filters.find(f => f.id === id);
        if (col) {
            this.filters.splice(this.filters.indexOf(col), 1);
        }
        const items = _.chain(this.baseList).map(data => data[id]).uniq().value();
        this.filters.push({ id, items });
        this.doFilter();
    }

    doFilter() {
        this.list = this.filters.reduce((list: any[], f) =>
        _.intersection(list,
            this.baseList.filter(b => f.items.some((i: string) => b[f.id] === i))), this.baseList);
        this.list.sort((a, b) => String(a[this.orderKey]).localeCompare(String(b[this.orderKey])));
        this.checkedList.emit(this.list);
    }
}
