import { RollcallType, Student } from '../rollcall-form.model';
import { RollcallFormEditorComponent } from './rollcall-editor.component';

export class BaseRollcallView {
    constructor(private editor: RollcallFormEditorComponent) { }

    get rollcallForm() {
        return this.editor.rollcallForm;
    }

    toggle(student: Student, type: RollcallType) {
        this.editor.toggle(student, type);
    }
}
