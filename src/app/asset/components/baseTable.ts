import { SelectionType, ColumnMode } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';

// tslint:disable-next-line:component-class-suffix
export class BaseTable {
    rows = [];
    columns = [];
    columnForShow = [];
    filterColumns = [];
    filters = [];
    baseList = [];
    selected = [];
    hinds: any[];
    SelectionType = SelectionType;
    searchStr: string;
    ColumnMode = ColumnMode;

    setData(value: any[], filterColumns: any[]) {
        if (value) {
            this.filterColumns = filterColumns;
            this.rows = value;
            this.baseList = value;
            // this.columns = this.columns.filter(th => th.prop === undefined
            //     || _.some(this.rows, it => it[th.prop] !== undefined && it[th.prop] !== null));
            // this.filterColumns = this.filterColumns.filter(col =>
            //     _.some(this.rows, it => it[col.name] !== undefined && it[col.name] !== null));
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
        this.searchStr = null;
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
                return !(col && col.items.some((i: string) => i === item)) &&
                    (!this.searchStr || !item || item.indexOf(this.searchStr) >= 0);
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

    hind(field: any) {
        if (!this.hinds) {
            this.hinds = [];
            this.hinds.push(field.prop);
        } else {
            const col = this.hinds.find(f => f === field.prop);
            if (col) {
                this.hinds.splice(this.hinds.indexOf(col), 1);
            } else {
                this.hinds.push(field.prop);
            }
        }
        if (this.hinds) {
            this.columnForShow = this.columns.filter((col: any) =>
                !this.hinds.some((item: string) => item === col.prop || item === col.name));
        }
    }

    isHind(field: any): boolean {
        return this.hinds && this.hinds.some(item => item === field.prop || item === field.name);
    }

    filterByHinder() {
        return (item: string) => !this.isHind(item);
    }

}
