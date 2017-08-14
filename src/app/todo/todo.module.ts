import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TodoListComponent,
    TodoListItemComponent
  ],
  exports: [
    TodoListComponent
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule { }
