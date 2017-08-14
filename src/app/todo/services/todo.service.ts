import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../../storage/services/storage.service';

const KEY_TODO_ITEMS = 'todo-items';

@Injectable()
export class TodoService {
  private todos: TodoItem[] = [];

  private todosSubject: ReplaySubject<TodoItem[]> = new ReplaySubject(1);

  constructor(private storageService: StorageService) {
  }

  public get todos$(): Observable<TodoItem[]> {
    this.todos = this.storageService.get(KEY_TODO_ITEMS) || [];

    console.log('restored todo items', this.todos);

    return this.todosSubject
      .do(x => console.log('updated items', x))
      .startWith(this.todos)
      .publishReplay(1)
      .refCount();
  }

  public addTodo(title: string) {
    const newTodo: TodoItem = {
      id: Date.now(),
      title: title,
      done: false
    };

    this.todos.push(newTodo);
    this.syncTodos();
  }

  public removeTodo(id: number) {
    this.todos = this.todos.filter(item => item.id !== id);
    this.syncTodos();
  }

  public updateTodo(updatedItem: TodoItem) {
    const itemIndex: number = this.todos.findIndex(item => item.id === updatedItem.id);

    if (itemIndex === -1) {
      console.error('could not find todo item to update');
      return;
    }

    this.todos[itemIndex] = updatedItem;

    this.syncTodos();
  }

  private syncTodos() {
    this.todosSubject.next(this.todos);
    this.storageService.set(KEY_TODO_ITEMS, this.todos);
  }
}
