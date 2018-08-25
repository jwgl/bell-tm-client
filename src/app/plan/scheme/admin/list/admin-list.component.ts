import { Component, OnInit } from '@angular/core';

import { Reusable } from 'core/route';

import { SchemeAdminService } from '../scheme-admin.service';

@Reusable()
@Component({
    styleUrls: ['admin-list.component.scss'],
    templateUrl: 'admin-list.component.html',
})
export class SchemeAdminListComponent implements OnInit {
    static reusable = true;

    departmentId: string;
    grade = 0;

    departments: any[];
    grades: number[];

    programs: any[];

    constructor(private service: SchemeAdminService) { }

    ngOnInit(): void {
        this.service.loadDepartments().subscribe(departments => {
            this.departments = departments;
            this.departmentId = departments[0].id;
            this.onDepartmentChange(this.departmentId);
        });
    }

    onDepartmentChange(departmentId: string) {
        this.service.loadGrades(departmentId).subscribe(grades => {
            this.grades = grades;
        });
    }

    search(): void {
        this.service.loadList({
            departmentId: this.departmentId,
            grade: `${this.grade}`,
        }).subscribe(data => {
            this.programs = data;
        });
    }
}
