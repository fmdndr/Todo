import { Injectable } from "@angular/core";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
@Injectable({
  providedIn: "root",
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    sessionStorage.clear();
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    return sessionStorage.getItem(USER_KEY);
  }
}
