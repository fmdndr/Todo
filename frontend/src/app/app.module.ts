import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TodosComponent } from "./todos/todos.component";
import { AddTodoComponent } from "./add-todo/add-todo.component";
import { ErrorComponent } from "./error/error.component";
import { LogoutComponent } from "./logout/logout.component";

import { authInterceptorProviders } from "./services/http/http-intercepter.service";
import { SignupComponent } from "./signup/signup.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    TodosComponent,
    AddTodoComponent,
    ErrorComponent,
    LogoutComponent,
    SignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, NgbModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
