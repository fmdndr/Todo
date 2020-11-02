import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../services/auth/authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  username: string = "";

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.params["username"];
    // console.log("this is dashboard username");
    // console.log(this.authenticationService.getAuthenticatedToken());
  }
}
