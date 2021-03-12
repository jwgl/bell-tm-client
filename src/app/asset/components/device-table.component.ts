import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';

@Component({
  selector: 'tm-asset-device-table',
  styleUrls: ['filter-group.scss'],
  templateUrl: 'device-table.component.html',
})
export class DeviceTableComponent implements OnInit {
  @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;
  @ViewChild('stateTmpl', { static: true }) stateTmpl: TemplateRef<any>;
  rows = [];
  columns = [];
  filterColumns = [];
  filters = [];
  baseList = [];
  selected = [];
  SelectionType = SelectionType;

  @Input() set data(value: any[]) {
    if (value) {
      this.filterColumns = [
        { name: 'building', label: '教学楼' },
        { name: 'place', label: '房间号' },
        { name: 'placeType', label: '房间类型' },
        { name: 'assetType', label: '资产类别' },
        { name: 'name', label: '设备名称' },
        { name: 'brand', label: '品牌' },
        { name: 'state', label: '状态' }
      ];
      this.rows = value;
      this.baseList = value;
      this.columns = this.columns.filter(th => th.headerCheckboxable
        || !this.rows.every((data: any) => data[th.prop] === undefined || data[th.prop] === null));
      this.filterColumns = this.filterColumns.filter(col =>
        !this.rows.every((data: any) => data[col.name] === undefined || data[col.name] === null));
    }
  }

  @Input() checkAble: boolean;
  @Output() checkedList = new EventEmitter<any>();

  ngOnInit() {
    this.columns = [
      { draggable: false, sortable: false, headerCheckboxable: this.checkAble, width: 30, checkboxable: true },
      { draggable: false, name: 'ID', prop: 'id', width: 80 },
      { prop: 'building', name: '教学楼', comparator: this.localComparator, width: 90 },
      { prop: 'place', name: '房间号', comparator: this.localComparator, width: 90 },
      { prop: 'placeType', name: '房间类型', comparator: this.localComparator, width: 90 },
      { prop: 'code', name: '资产编号', width: 90 },
      { prop: 'assetType', name: '资产类别', comparator: this.localComparator, width: 90 },
      { prop: 'name', name: '设备名称', comparator: this.localComparator, width: 90 },
      { prop: 'brand', name: '品牌', comparator: this.localComparator, width: 90 },
      { prop: 'specs', name: '规格型号', width: 90 },
      { prop: 'parameter', name: '参数', width: 90 },
      { prop: 'sn', name: '设备编号', width: 90 },
      { prop: 'unit', name: '单位', width: 60 },
      { prop: 'pcs', name: '数量', width: 60 },
      { prop: 'price', name: '单价', width: 60 },
      { prop: 'total', name: '金额', width: 60 },
      { prop: 'dateBought', name: '购买时间', width: 90 },
      { prop: 'qualifyMonth', name: '保质期', width: 90 },
      { prop: 'supplier', name: '供应商', width: 90 },
      { prop: 'state', name: '状态', comparator: this.localComparator, width: 90, cellTemplate: this.stateTmpl },
      { prop: 'note', name: '备注', width: 150 },
    ];
  }

  @Input() set detailShow(value: boolean) {
    if (value) {
      const field = this.columns.find(th => th.field === 'id');
      if (field) {
        field['cellTemplate'] = this.idTmpl;
      }
    }
  }

  localComparator(str1: string, str2: string): number {
    return String(str1).localeCompare(str2);
  }

  link(value: string) {
    const url = window.location.pathname;
    return `${url}/${value}`;
  }

  stateGetter(state: any) {
    return { USING: '在用', STANDBY: '备用', REPAIRING: '维修', OFF: '报废', CLEARANCE: '核销', LOST: '丢失' }[state];
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

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    selected.forEach(t => t.checked = true);
    this.selected.push(...selected);
    this.checkedList.emit(this.selected);
  }

  label(id: string, value: string): string {
    switch (id) {
      case 'state': return this.stateGetter(value);
      default: return value;
    }
  }
}
