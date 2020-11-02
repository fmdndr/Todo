import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { AuthenticationService } from "../services/auth/authentication.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  user: User;
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User(this.firstname, this.lastname, this.email, this.username, this.password);
  }

  handleRegister(): void {
    this.authenticationService.signUp(this.user).subscribe((response) => {
      this.router.navigate(["login"]);
    });
  }
}
