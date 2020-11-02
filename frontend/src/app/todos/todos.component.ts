import { Component, OnInit } from "@angular/core";
import { TodoService } from "../services/todo/todo.service";
import { Todo } from "../models/todo.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  username: string = "";
  selectedTodo: Todo[];
  todo: Todo[];

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("auth-user");
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.getAllTodo(this.username).subscribe((data) => {
      //console.log(data);
      this.todo = data;
    });
  }

  handleDone(id: number) {
    this.todoService.setDoneTodo(this.username, id, this.todo).subscribe((data) => {
      this.router.navigate(["todos"]);
    });
  }
  handleDelete(id: number) {
    this.todoService.deleteTodo(this.username, id).subscribe((data) => {
      //console.log(data);
      this.refreshTodos();
    });
  }
}
