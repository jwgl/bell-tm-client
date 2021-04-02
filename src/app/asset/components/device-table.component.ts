import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { BaseTable } from './baseTable';

@Component({
  selector: 'tm-asset-device-table',
  styleUrls: ['filter-group.scss'],
  templateUrl: 'device-table.component.html',
})
export class DeviceTableComponent extends BaseTable {
  @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;
  @ViewChild('stateTmpl', { static: true }) stateTmpl: TemplateRef<any>;

  @Input() set data(value: any[]) {
    if (value) {
      const filterColumns = [
        { name: 'building', label: '教学楼' },
        { name: 'place', label: '房间号' },
        { name: 'placeType', label: '房间类型' },
        { name: 'assetType', label: '资产类别' },
        { name: 'name', label: '设备名称' },
        { name: 'brand', label: '品牌' },
        { name: 'state', label: '状态' }
      ];
      this.setData(value, filterColumns);
    }
  }

  @Input() set checkAble(value: boolean) {
    if (value) {
      this.columns = [{ draggable: false, sortable: false, headerCheckboxable: true, width: 30, checkboxable: true }]
        .concat(this.columns);
    }
  }

  @Input() size: string;
  @Output() checkedList = new EventEmitter<any>();

  constructor() {
    super();
    this.columns = [
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
      { prop: 'state', name: '状态', comparator: this.localComparator, width: 90 },
      { prop: 'note', name: '备注', width: 150 },
    ];
  }

  @Input() set detailShow(value: boolean) {
    if (value) {
      const prop = this.columns.find(th => th.prop === 'id');
      if (prop) {
        prop['cellTemplate'] = this.idTmpl;
      }
    }
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    selected.forEach(t => t.checked = true);
    this.selected.push(...selected);
    this.checkedList.emit(this.selected);
  }

  summary(): string {
    const countAll = this.rows.reduce((sum: any, row) => {
      const mount = sum.mount + row.price * row.pcs;
      const count = sum.count + row.pcs;
      return { mount, count };
    }, { mount: 0, count: 0 });
    if (countAll.mount) {
      return `总数量：${countAll.count} 总金额：${countAll.mount}(元)`;
    } else {
      return `总数量：${countAll.count}`;
    }
  }
}
