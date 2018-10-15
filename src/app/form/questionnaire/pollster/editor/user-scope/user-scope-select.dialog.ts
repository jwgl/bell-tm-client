import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseDialog } from 'core/dialogs';

import { UserScopeService } from './user-scope.service';
import { AuthService } from 'core/auth';
import { UserScope, UserProperty } from 'app/form/questionnaire/shared/user-scope.model';
import { tap } from 'rxjs/operators';

@Component({
    templateUrl: 'user-scope-select.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class UserScopeSelectDialog extends BaseDialog {
    title: string;
    surveyScope: string;
    userType: string;
    visibles: { [key in UserProperty]: boolean };
    departments: { id: string, name: string }[];
    _adminClasses: { id: number, name: string, grade: number, subject: string }[];
    grades: number[];
    subjects: string[];
    adminClasses: string[];

    selectedDepartment: { id: string, name: string } = null;
    selectedGrade = 0;
    selectedSubject = '';
    selectedAdminClass = '';
    selectedSex = '';

    constructor(private service: UserScopeService, private authService: AuthService) {
        super();
    }

    onDeparmentChanged(department: { id: string, name: string }) {
        this.service.getAdminClasses(department.id).subscribe(adminClasses => this.onLoadAdminClass(adminClasses));
    }

    updateOptions() {
        this.grades = this._adminClasses
            .filter(adminClass => !this.selectedSubject || adminClass.subject === this.selectedSubject)
            .map(adminClass => adminClass.grade)
            .filter((grade, index, array) => array.indexOf(grade) === index);
        this.subjects = this._adminClasses
            .filter(adminClass => !this.selectedGrade || adminClass.grade === this.selectedGrade)
            .map(adminClass => adminClass.subject)
            .filter((subject, index, array) => array.indexOf(subject) === index);
        this.adminClasses = this._adminClasses
            .filter(adminClass => (!this.selectedGrade || adminClass.grade === this.selectedGrade)
                && (!this.selectedSubject || adminClass.subject === this.selectedSubject))
            .map(adminClass => adminClass.name)
            .filter((adminClass, index, array) => array.indexOf(adminClass) === index);
    }

    onLoadAdminClass(adminClasses: any) {
        this._adminClasses = adminClasses;
        this.updateOptions();
    }

    protected onOpening(): Observable<any> {
        this.title = this.options.title;
        this.surveyScope = this.options.surveyScope;
        this.userType = this.options.userType;
        this.visibles = {
            '学院': this.surveyScope === 'SCHOOL',
            '年级': this.userType === 'STUDENT' && (this.surveyScope === 'SCHOOL' || this.surveyScope === 'DEPARTMENT'),
            '专业': this.userType === 'STUDENT' && (this.surveyScope === 'SCHOOL' || this.surveyScope === 'DEPARTMENT'),
            '班级': this.userType === 'STUDENT' && (this.surveyScope === 'SCHOOL' || this.surveyScope === 'DEPARTMENT'),
            '性别': true,
        };

        if (this.visibles['学院']) {
            return this.service.getDepartments(this.userType).pipe(
                tap(departments => this.departments = departments),
            );
        } else if (this.visibles['班级']) {
            return this.service.getAdminClasses(this.authService.userInfo.departmentId).pipe(
                tap(adminClasses => this.onLoadAdminClass(adminClasses)),
            );
        } else {
            return null;
        }
    }

    protected onConfirmed(): any {
        const result: { [key in UserProperty]?: string | number } = {};
        if (this.selectedAdminClass) {
            result['班级'] = this.selectedAdminClass;
        } else {
            if (this.selectedSubject) {
                result['专业'] = this.selectedSubject;
            } else if (this.selectedDepartment) {
                result['学院'] = this.selectedDepartment.name;
            }
            if (this.selectedGrade) {
                result['年级'] = this.selectedGrade;
            }
        }

        if (this.selectedSex) {
            result['性别'] = this.selectedSex;
        }

        return result;
    }

    get isValid(): boolean {
        return !!this.selectedDepartment ||
               !!this.selectedGrade ||
               !!this.selectedSubject ||
               !!this.selectedAdminClass ||
               !!this.selectedSex;
    }
}
