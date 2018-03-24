import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {TodoVO} from './domain/todo.vo';
import {Observable} from 'rxjs/Observable';
import {ResultVO} from './domain/result.vo';

@Injectable()
export class UserService {

  private SERVER: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getTodoList(): Observable<TodoVO[]> {
    return this.http.get<TodoVO[]>(this.SERVER + '/api/todo');
  }

  addTodo(todo: TodoVO): Observable<TodoVO> {
    return this.http.post<TodoVO>(this.SERVER + '/api/todo', todo, {headers: this.headers});
  }

  modifyTodo(todo: TodoVO): Observable<TodoVO> {
    return this.http.put<TodoVO>(this.SERVER + '/api/todo', todo, {headers: this.headers});
  }

  removeTodo(todo_id: number): Observable<ResultVO> {
    return this.http.delete<ResultVO>(this.SERVER + `/api/todo?todo_id=${todo_id}`);
  }
}
