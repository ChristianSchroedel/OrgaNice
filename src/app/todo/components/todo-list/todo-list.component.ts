import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs/Observable';
import { TodoItem } from '../../services/todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  public todos$: Observable<TodoItem[]>;
  public todoName: string = '';

  constructor(private todoService: TodoService) { }

  public ngOnInit() {
    this.todos$ = this.todoService.todos$;
  }

  public addTodo() {
    if (this.todoName.length > 0) {
      this.todoService.addTodo(this.todoName);
    }

    this.todoName = '';
  }

  public removeTodo(todoId: number) {
    this.todoService.removeTodo(todoId);
  }

  public toggleTodoDone(item: TodoItem) {
    item.done = !item.done;

    this.todoService.updateTodo(item);
  }
}
