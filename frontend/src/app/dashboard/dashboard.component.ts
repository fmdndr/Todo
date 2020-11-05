import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  username: string = "";

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.router.snapshot.params["username"];
    // console.log("this is dashboard username");
    // console.log(this.authenticationService.getAuthenticatedToken());
  }
}
