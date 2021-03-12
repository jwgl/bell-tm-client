import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import * as _ from 'lodash';
import { Level, levelLabels, ProjectStatus, projectStatusLabels, Conclusion, conclusionLabels } from '../settings/shared/constants';

@Component({
  selector: 'hunt-table',
  styleUrls: ['hunt-table.component.scss'],
  templateUrl: 'hunt-table.component.html',
})
export class HuntTableComponent implements OnInit {
  @ViewChild('idTmpl', { static: true }) idTmpl: TemplateRef<any>;
  @ViewChild('lockTmpl', { static: true }) lockTmpl: TemplateRef<any>;
  @ViewChild('levelTmpl', { static: true }) levelTmpl: TemplateRef<any>;
  @ViewChild('statusTmpl', { static: true }) statusTmpl: TemplateRef<any>;
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
        { name: 'departmentName', label: '单位' },
        { name: 'level', label: '等级' },
        { name: 'parentName', label: '项目大类' },
        { name: 'subtype', label: '项目类别' },
        { name: 'dateStart', label: '立项时间' },
        { name: 'middleYear', label: '拟中期' },
        { name: 'knotYear', label: '拟结题' },
        { name: 'status', label: '建设情况' },
        { name: 'state', label: '审批状态' }
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
      { draggable: false, name: 'ID', prop: 'id', width: 80, cellTemplate: this.idTmpl },
      { draggable: false, name: '锁', prop: 'locked', cellTemplate: this.lockTmpl, width: 40 },
      { draggable: false, name: '专家数', prop: 'countExpert', width: 60 },
      {
        draggable: false,
        name: '单位',
        prop: 'departmentName',
        width: 90,
        comparator: this.localComparator.bind(this),
      },
      { draggable: false, name: '项目名称', prop: 'name', comparator: this.localComparator.bind(this) },
      { draggable: false, name: '项目编号', prop: 'code', width: 90 },
      { draggable: false, name: '等级', prop: 'level', cellTemplate: this.levelTmpl, width: 70 },
      { draggable: false, name: '项目大类', prop: 'parentName', comparator: this.localComparator.bind(this) },
      { draggable: false, name: '项目类别', prop: 'subtype', comparator: this.localComparator.bind(this) },
      { draggable: false, name: '负责人', prop: 'principalName', width: 90, comparator: this.localComparator.bind(this) },
      { draggable: false, name: '岗位', prop: 'office', width: 90 },
      { draggable: false, name: '职称', prop: 'title', width: 90 },
      { draggable: false, name: '学位', prop: 'degree', width: 90 },
      { draggable: false, name: '电话', prop: 'phone', width: 90 },
      { draggable: false, name: '立项时间', prop: 'dateStart', width: 90 },
      { draggable: false, name: '拟中期', prop: 'middleYear', width: 60 },
      { draggable: false, name: '拟结题', prop: 'knotYear', width: 60 },
      { draggable: false, name: '结项日期', prop: 'dateFinished' },
      { draggable: false, name: '延期', prop: 'delayTimes', width: 60 },
      { draggable: false, name: '申请时间', prop: 'date', width: 90 },
      { draggable: false, name: '建设情况', prop: 'status', cellTemplate: this.statusTmpl, width: 90 },
      { draggable: false, name: '审批状态', prop: 'state', cellTemplate: this.stateTmpl, width: 90 },
      { draggable: false, name: '结论', prop: 'conclusion', width: 90 },
    ];
  }

  @Input() set cols(value: any[]) {
    this.columns = this.columns.concat(value);
  }

  levelGetter(value: any) {
    return levelLabels[Level[value]].text;
  }

  statusGetter(value: any) {
    return projectStatusLabels[ProjectStatus[value]].text;
  }

  stateGetter(value: any) {
    return { SUBMITTED: '待审核', CHECKED: '待审批', FINISHED: '完成' }[value];
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

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    selected.forEach(t => t.checked = true);
    this.selected.push(...selected);
    this.checkedList.emit(this.selected);
  }

  label(id: string, value: string): string {
    switch (id) {
      case 'level': return levelLabels[Level[value]].text;
      case 'status': return projectStatusLabels[ProjectStatus[value]].text;
      case 'state': return this.stateGetter(value);
      default: return value;
    }
  }
}
