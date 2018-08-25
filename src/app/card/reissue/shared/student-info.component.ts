import { Component, Input } from '@angular/core';

@Component({
    selector: 'tm-student-info',
    styleUrls: ['student-info.component.scss'],
    templateUrl: 'student-info.component.html',
})
export class StudentInfoComponent {
    @Input() student: any;
}
