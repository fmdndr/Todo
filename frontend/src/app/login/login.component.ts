import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/auth/authentication.service";
import { TokenStorageService } from "../services/auth/token-storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  invalidLogin: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  handleLogin() {
    this.authenticationService.authenticate(this.username, this.password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.username);
        //console.log(data);
        this.route.navigate(["dashboard", this.username]);
      },
      (error) => {
        //console.log(error);
      }
    );
  }
}
