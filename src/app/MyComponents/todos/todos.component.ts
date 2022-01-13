import { Todo } from './../../Todo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor() {
    this.todos = [
      
    ];
  }

  ngOnInit(): void {}
  deleteTodo(todo: Todo) {
    console.log(todo);
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }
  addTodo(todo: Todo) {
    console.log(todo);
    this.todos.push(todo);
  }
}
