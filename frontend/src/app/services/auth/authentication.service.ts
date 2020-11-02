import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";

import { API_URL } from "../../app.constants";
//
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + "auth/signin", { username, password }, httpOptions);
  }
  signUp(user: User): Observable<User> {
    return this.http.post<User>(API_URL + "auth/signup", user);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("auth-user");
    return user != null;
  }

  logout() {
    sessionStorage.removeItem("auth-user");
  }
}
