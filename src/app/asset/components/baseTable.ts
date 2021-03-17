import { SelectionType } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';

// tslint:disable-next-line:component-class-suffix
export class BaseTable {
    rows = [];
    columns = [];
    filterColumns = [];
    filters = [];
    baseList = [];
    selected = [];
    SelectionType = SelectionType;

    setData(value: any[], filterColumns: any[], checkAble: boolean) {
        if (value) {
            this.filterColumns = filterColumns;
            this.rows = value;
            this.baseList = value;
            this.columns = this.columns.filter(th => (th.prop === undefined && checkAble)
                || !this.rows.every((data: any) => data[th.prop] === undefined || data[th.prop] === null));
            this.filterColumns = this.filterColumns.filter(col =>
                !this.rows.every((data: any) => data[col.name] === undefined || data[col.name] === null));
        }
    }

    localComparator(str1: string, str2: string): number {
        return String(str1).localeCompare(str2);
    }

    link(value: string) {
        const url = window.location.pathname;
        return `${url}/${value}`;
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
        this.rows.forEach(checkbox => checkbox.checked = checked);
    }

    doFilter() {
        this.rows = this.filters.reduce((list: any[], f) =>
            _.intersection(list,
                this.baseList.filter(b => f.items.some((i: string) => b[f.id] === i))), this.baseList);
    }
}
