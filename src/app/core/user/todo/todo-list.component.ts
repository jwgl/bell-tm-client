import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoService } from './todo.service';
import { AuthService } from 'core/auth';

@Component({
    templateUrl: 'todo-list.component.html',
})
export class TodoListComponent {
    readonly statuses: any[] = [
        { status: 'open', label: '待处理', class: 'badge-success' },
        { status: 'closed', label: '已处理', class: 'badge-danger' },
    ];

    status: string;
    counts: { [key: string]: number };
    todos: any[];
    totalCount: number;
    offset: number;
    max = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: TodoService,
        private authService: AuthService,
    ) {
        this.route.params.subscribe(params => {
            this.service.loadCounts().subscribe(counts => {
                this.counts = counts;
                this.status = params['status'];
                this.loadList(0);
            });
        });
    }

    private loadList(offset: number) {
        this.service.loadListByPage(offset, this.max, { is: this.status }).subscribe(result => {
            this.offset = offset;
            this.totalCount = this.counts[this.status];
            this.todos = result.items;
        });
    }

    onClick(item: any) {
        if (item.dateProcessed || item.dateReceived) {
            this.navigate(item);
        } else {
            this.service.updateReceived(item.id).subscribe(() => this.navigate(item));
        }
    }

    navigate(item: any) {
        this.router.navigateByUrl(item.url
            .replace('${id}', item.entityId)
            .replace('${workitem}', item.id)
            .replace('${userId}', this.authService.userInfo.id)
            .replace('${todo}', item.dateProcessed ? 'done' : 'todo')
        );
    }
}
