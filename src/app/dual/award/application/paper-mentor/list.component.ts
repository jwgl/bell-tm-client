import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { CheckboxSelectorComponent } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { ReviewList } from 'core/workflow';

import { MentorSelectDialog } from '../shared/mentor/mentor-select.dialog';
import { PaperMentorService } from './paper-mentor.service';

@Component({
    styleUrls: ['list.component.scss'],
    templateUrl: 'list.component.html',
})
export class PaperMentorListComponent {
    @ViewChildren(CheckboxSelectorComponent) selectors: QueryList<CheckboxSelectorComponent>;
    list: ReviewList;
    userId: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: PaperMentorService,
                private dialog: Dialog) {
        this.userId = this.route.snapshot.params['userId'];

        route.data.subscribe((data: { list: ReviewList }) => {
            this.list = data.list;
        });
    }

    checkAll(checked: boolean) {
        this.selectors.forEach(checkbox => checkbox.checked = checked);
    }

    open() {
        this.service.getMentors().subscribe(mentors =>
        this.dialog.open(MentorSelectDialog, {mentors}).then(result => {
            const idList = this.selectors.filter(s => s.checked).map(s => s.data.id);
            this.service.setMentor({ids: idList, teacherId: result})
            .subscribe(() => {
                this.router.navigate([
                    '/dual/checkers',
                    this.userId,
                    'papers',
                    'done'],
                );
            });
        }));
    }

    get mentorAble(): boolean {
        const match = window.location.href.match(/\/todo+/);
        return !_.isEmpty(match);
    }
}
