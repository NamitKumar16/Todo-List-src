import { Todo } from './../../Todo';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  localItem: string | null;
  constructor() {
    this.localItem = localStorage.getItem('todos');
    if (this.localItem == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItem);
    }
  }
  ngOnInit(): void {}
  deleteTodo(todo: Todo) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', todo.title+' has been deleted.', 'success');
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    });
  }
  deleteAll() {
    if (this.todos.length != 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete All!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'All Todos have been deleted.', 'success');
          this.todos.splice(0, this.todos.length);
          localStorage.setItem('todos', JSON.stringify(this.todos));
        }
      });
    }
    else{
      Swal.fire('List is Already Empty!!', '', 'error')
    }
  }
  addTodo(todo: Todo) {
    if (todo.title != null || todo.desc != null) {
      this.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      Swal.fire(todo.title+' Added Successfully', '', 'success');
    }
    else{
      Swal.fire('A field is left empty', '', 'error');
    }
  }
  toggleTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
