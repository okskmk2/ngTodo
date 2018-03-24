import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(300, style({opacity: 1, transform: 'translate(0, 0)'}))
      ])
    ])
  ]
})
export class AngularComponent implements OnInit {
  todoList: TodoVO[];
  todoVO = new TodoVO();
  // 기존값을 저장할 Map 객체 정의
  tempTodoList: Map<number, TodoVO>;

  constructor(private userService: UserService) {
    this.tempTodoList = new Map<number, TodoVO>();
  }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.userService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

  addTodo() {
    this.userService.addTodo(this.todoVO)
      .subscribe(body => this.todoList.unshift(body));
  }

  save(todo: TodoVO) {
    // 기존값 저장: todo객체를 deep copy
    const tempTodo = Object.assign({}, todo);
    this.tempTodoList.set(todo.todo_id, tempTodo);

    todo.isEdited = true;
  }

  restore(todo: TodoVO) {
    // 기존값 복원
    const tempTodo = this.tempTodoList.get(todo.todo_id);
    Object.assign(todo, tempTodo);

    todo.isEdited = false;
  }

  modifyTodo(todo: TodoVO) {
    // todo 객체는 created, updated, isEdited가 모두 넘어간다.
    // 그러므로 isFinished, todo, todo_id만 넘기는게 바람직하다.
    this.userService.modifyTodo(todo)
      .subscribe(body => {
        Object.assign(todo, body);
        todo.isEdited = false;
      });
  }
}
