import { Component } from '@angular/core';

@Component({
    selector: 'tm-nav',
    templateUrl: 'nav.component.html',
})
export class NavComponent {
    options = [
        { label: '教师周课表', type: 'teachers' },
        { label: '教室周课表', type: 'places' },
        { label: '列表', type: 'schedules' },
        { label: '优先听课名单', type: 'priorities' },
        { label: '未排实践课', type: 'unschedules' },
    ];
}
