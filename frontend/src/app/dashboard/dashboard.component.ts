import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  username: string = "";

  constructor() {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("auth-user");
    // console.log("this is dashboard username");
    // console.log(this.authenticationService.getAuthenticatedToken());
  }
}
