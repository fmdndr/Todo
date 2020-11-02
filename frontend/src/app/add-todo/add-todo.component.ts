import { Component, Input, OnInit } from "@angular/core";
import { TodoService } from "../services/todo/todo.service";
import { Todo } from "../models/todo.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"],
})
export class AddTodoComponent implements OnInit {
  username: string = "";
  id: number;
  description: string = "";
  isDone: boolean = false;
  createdDate: Date;
  updatedDate: Date;

  todo: Todo;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("auth-user");
    this.todo = new Todo(this.id, this.createdDate, this.description, this.isDone, this.updatedDate);
    // console.log(this.todo);
  }

  saveTodo(): void {
    this.todoService.createTodo(this.username, this.todo).subscribe((data) => {
      //console.log(data);
      this.router.navigate(["todos"]);
    });
  }
}
