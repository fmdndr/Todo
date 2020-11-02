import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../services/auth/authentication.service";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  username: string = "";

  constructor(public authenticationService: AuthenticationService, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
