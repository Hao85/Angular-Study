import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HTTP_INTERCEPTORS,
    HttpResponse,
    HttpInterceptor,
  } from "@angular/common/http";
  import { Observable, of } from "rxjs";
  import { mergeMap, materialize, dematerialize, delay } from "rxjs/operators";
  
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.Dc7VscaQrFEQvL5rh2DIJH0gS1_t5mb_TVjVS8y94kY";
  
  export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const { url, method, headers, body } = request;
      // wrap in delayed obervable to simulate server api call
      return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize())
        .pipe(delay(1000))
        .pipe(dematerialize());
  
      function handleRoute() {
        switch (true) {
          case url.endsWith("/api/authenticate") && method === "POST":
            return authenticate();
          case url.endsWith("/api/orders") && method === "GET":
            return orders();
          default:
            // pass through any requests not handled above
            return next.handle(request);
        }
      }
  
      function authenticate() {
        const { email, password } = JSON.parse(body);
        if (email === "john@domain.com" && password === "1234")
          return ok({ token: token });
        else return badRequest();
      }
  
      function orders() {
        if (headers.get("Authorization") === "Bearer " + token)
          return ok([1, 2, 3]);
        else return unauthorized();
      }
  
      function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body }));
      }
  
      function unauthorized() {
        // 401: unAuthorized
        return of(new HttpResponse({ status: 401 }));
      }
  
      function badRequest() {
        // 400: bad request
        return of(new HttpResponse({ status: 400 }));
      }
    }
  }
  
  export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
  };
  