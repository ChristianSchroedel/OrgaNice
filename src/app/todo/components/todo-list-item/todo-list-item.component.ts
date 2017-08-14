import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent {
  @Input() title: string;

  @Input()
  @HostBinding('class.item--done')
  done: boolean;

  @Output() deletePressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() doneChanged: EventEmitter<void> = new EventEmitter<void>();
}
