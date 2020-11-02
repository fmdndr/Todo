import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "src/app/models/todo.model";

import { TODO_URL } from "../../app.constants";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
  }),
};

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}

  createTodo(username: string, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${TODO_URL}/add/${username}/todo`, todo, httpOptions);
  }
  getAllTodo(username: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${TODO_URL}/${username}/todos`, httpOptions);
  }
  setDoneTodo(username: string, id: number, todo: Todo[]): Observable<Todo> {
    //console.log("in service");
    let t = todo.find((d) => d.id === id);
    t.isDone = true;
    t.updatedDate = new Date();
    return this.http.put<Todo>(`${TODO_URL}/update/${username}/${id}`, t, httpOptions);
  }
  deleteTodo(username: string, id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${TODO_URL}/delete/${username}/${id}`, httpOptions);
  }
}
