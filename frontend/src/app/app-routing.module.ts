import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RouteGuardService } from "./services/route-guard.service";

import { AddTodoComponent } from "./add-todo/add-todo.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { TodosComponent } from "./todos/todos.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ErrorComponent } from "./error/error.component";
import { LogoutComponent } from "./logout/logout.component";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [RouteGuardService] },
  { path: "todos", component: TodosComponent, canActivate: [RouteGuardService] },
  { path: "add/:username", component: AddTodoComponent, canActivate: [RouteGuardService] },
  { path: "logout", component: LogoutComponent, canActivate: [RouteGuardService] },

  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
