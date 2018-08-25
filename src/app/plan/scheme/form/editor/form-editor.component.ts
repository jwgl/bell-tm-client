import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonDialog } from 'core/common-dialogs';
import { EditMode } from 'core/constants';

import { AbstractGroup, Direction, Property, Scheme, SchemeCourse, SchemeDto } from '../../shared/scheme.model';
import { SchemeFormService } from '../scheme-form.service';
import { CourseEditorService } from './course-editor/course-editor.service';
import './form-editor.model';

/**
 * 教学计划编辑器
 */
@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class SchemeFormEditorComponent {
    vm: Scheme;

    private editMode: EditMode;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private courseEditor: CourseEditorService,
        private service: SchemeFormService,
        @Inject('DEPARTMENT_SCHEMES_API_URL')
        private departmentSchemesApiUrl: string,
        @Inject('DEPARTMENT_DIRECTIONS_API_URL')
        private departmentDeirectionsApiUrl: string,
    ) {
        this.route.params.subscribe(params => {
            this.editMode = this.route.snapshot.data['mode'];
            switch (this.editMode) {
                case EditMode.Create:
                    this.service.loadDataForCreate<SchemeDto>({
                        program: this.route.snapshot.queryParams['program']
                    }).subscribe(data => this.vm = new Scheme(data));
                    break;
                case EditMode.Revise:
                    this.service.loadItemForRevise<SchemeDto>(params['id']).subscribe(data => this.vm = new Scheme(data));
                    break;
                case EditMode.Edit:
                    this.service.loadItemForEdit<SchemeDto>(params['id']).subscribe(data => this.vm = new Scheme(data));
                    break;
            }
        });
    }

    get canEditVersion(): boolean {
        return this.editMode === EditMode.Create || this.editMode === EditMode.Revise;
    }

    versionChanged(newValue: number) {
        this.vm.versionNumber = newValue;
    }

    addCourse(group: AbstractGroup): void {
        this.courseEditor.open({
            editMode: EditMode.Create,
            terms: this.vm.terms,
            group,
        }).then(dto => {
            group.add(dto);
            group.sort();
        });
    }

    editCourse(schemeCourse: SchemeCourse): void {
        this.courseEditor.open({
            editMode: EditMode.Edit,
            terms: this.vm.terms,
            group: schemeCourse.group,
            dto: schemeCourse.toClientDto(),
        }).then(dto => {
            schemeCourse.update(dto);
            schemeCourse.group.sort();
        });
    }

    deleteCourse(schemeCourse: SchemeCourse): void {
        schemeCourse.remove();
    }

    restoreCourse(schemeCourse: SchemeCourse): void {
        schemeCourse.restore();
    }

    importCourses(group: AbstractGroup): void {
        if (group instanceof Property) {
            this.importPropertyCourses(group);
        } else if (group instanceof Direction) {
            this.importDirectionCourses(group);
        }
    }

    importPropertyCourses(property: Property) {
        this.dialog.list(
            `导入课程 - ${property.name}`,
            this.departmentSchemesApiUrl.replace('${departmentId}', this.vm.departmentId),
            (item: any) => `${item.grade}级${item.subjectName}`,
        ).then(id => {
            this.service.loadPropertyCourses(id, property.id).subscribe(courses => {
                courses.forEach(course => {
                    if (!property.contains(course.courseId)) {
                        property.add(course);
                    }
                });
                property.sort();
            });
        });
    }

    importDirectionCourses(direction: Direction) {
        this.dialog.list(
            `导入课程 - ${direction.name}`,
            this.departmentDeirectionsApiUrl.replace('${departmentId}', this.vm.departmentId),
            (item: any) => `${item.grade}级${item.subjectName}-${item.directionName}`,
            (item: any) => `${item.schemeId}:${item.directionId}`,
        ).then(result => {
            const arr = result.split(':');
            this.service.loadDirectionCourses(arr[0], arr[1]).subscribe(courses => {
                courses.forEach(course => {
                    if (!direction.contains(course.courseId)) {
                        direction.add(course);
                    }
                });
                direction.sort();
            });
        });
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.service.create<number>(this.vm.toServerDto()).subscribe(
                    id => this.router.navigate(['../', id], { relativeTo: this.route }),
                    error => alert(JSON.stringify(error)),
                );
                break;
            case EditMode.Revise:
                this.service.revise<number>(this.vm.toServerDto()).subscribe(
                    id => this.router.navigate(['../../', id], { relativeTo: this.route }),
                    error => alert(JSON.stringify(error)),
                );
                break;
            case EditMode.Edit:
                this.service.update(this.vm.id, this.vm.toServerDto()).subscribe(
                    id => this.router.navigate(['../'], { relativeTo: this.route }),
                    error => alert(JSON.stringify(error)),
                );
                break;
        }
    }
}
