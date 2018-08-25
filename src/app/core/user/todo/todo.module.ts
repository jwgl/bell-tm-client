import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { TodoRoutingModule } from './todo.routing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        TodoRoutingModule,
    ],
    declarations: [
        TodoListComponent,
    ],
    providers: [
        TodoService,
        { provide: 'TODO_API_URL', useValue: '/api/core/users/${userId}/works' },
    ],
})
export class TodoModule { }
