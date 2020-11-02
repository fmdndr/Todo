import { AuthenticationService } from "../auth/authentication.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "../auth/token-storage.service";

const TOKEN_HEADER_KEY = "Authorization";
@Injectable({
  providedIn: "root",
})
export class HttpIntercepterService implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.tokenStorage.getToken();
    //console.log("interceptor token");
    //console.log(token);
    if (token != null) {
      authReq.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
    }
    //console.log("auth req");
    //console.log(authReq);
    //console.log("after auth reqe");

    return next.handle(authReq);
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi: true },
];
