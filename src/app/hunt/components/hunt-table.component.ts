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
  @ViewChild('levelTmpl', { static: true }) levelTmpl: TemplateRef<any>;
  @ViewChild('statusTmpl', { static: true }) statusTmpl: TemplateRef<any>;
  // @ViewChild('hdrTmpl', { static: true }) hdrTmpl: TemplateRef<any>;
  rows = [];
  columns = [];
  filters = [];
  baseList = [];
  selected = [];
  SelectionType = SelectionType;

  @Input() set data(value: any[]) {
    if (value) {
      this.rows = value;
      this.columns = this.columns.filter(th => th.headerCheckboxable
        || !this.rows.every((data: any) => data[th.prop] === undefined || data[th.prop] === null));
    }
  }

  @Input() checkAble: boolean;
  @Output() checkedList = new EventEmitter<any>();

  ngOnInit() {
    this.columns = [
      { draggable: false, sortable: false, headerCheckboxable: this.checkAble, width: 30, checkboxable: true },
      { draggable: false, name: 'ID', prop: 'id', width: 80, cellTemplate: this.idTmpl },
      { draggable: false, name: '锁', prop: 'locked', width: 40 },
      { draggable: false, name: '专家数', prop: 'countExpert', width: 60 },
      {
        draggable: false,
        name: '单位',
        prop: 'departmentName',
        width: 90,
        comparator: this.localComparator.bind(this),
        // headerTemplate: this.hdrTmpl
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
      { draggable: false, name: '审批状态', prop: 'state', width: 90 },
      { draggable: false, name: '结论', prop: 'conclusion', width: 90 },
    ];
  }

  levelGetter(value: any) {
    return levelLabels[Level[value]].text;
  }

  statusGetter(value: any) {
    return projectStatusLabels[ProjectStatus[value]].text;
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
    this.rows = this.filters.reduce((list: any[], f) =>
      _.intersection(list,
        this.baseList.filter(b => f.items.some((i: string) => b[f.id] === i))), this.baseList);
  }

  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    selected.forEach(t => t.checked = true);
    this.selected.push(...selected);
    console.log('Select Event', selected, this.selected);
    this.checkedList.emit(this.selected);
  }
  // onActivate(event) {
  //   console.log('Activate Event', event);
  // }
}
