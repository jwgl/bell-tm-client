import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'gradeFilter' })
export class GradeFilterPipe implements PipeTransform {
    transform(subjects: any[], selectedGrade: number) {
        if (selectedGrade === 0) {
            return subjects;
        } else {
            return subjects.filter(subject => subject.grades[selectedGrade] != null);
        }
    }
}
