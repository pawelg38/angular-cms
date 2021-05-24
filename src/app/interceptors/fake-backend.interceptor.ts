import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, of} from 'rxjs';
import { delay, dematerialize, materialize } from 'rxjs/operators';

const usersKey = 'usersKey';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;
    return handleRoute();

    function handleRoute() {
            
      switch (true) {
        case url.endsWith('/authenticate') && method === 'POST':
            return authenticate();
        case url.endsWith('/register') && method === 'POST':{
            return register();}
        default:{
            return next.handle(request);
      }}
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({...basicDetails(user), token: 'fake-jwt-token'})
    }
    function basicDetails(user) {
        const { id, username, firstName, lastName } = user;
        return { id, username, firstName, lastName };
    }

    function register() {
      const user = body

      if(users.find(x => x.username === user.username)) {
        return error('Username ' + user.username + ' is already used by someone else')
      }

      user.id = users.length + 1;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function error(message) {
      //console.log("error123");
      return throwError({ error: { message } })
            .pipe(materialize(), delay(200), dematerialize());
    }

    function ok(body?) {
        return of(new HttpResponse({ status: 200, body }))
            .pipe(delay(500));
    }
  }
}

// export const fakeBackendProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: FakeBackendInterceptor,
//   multi: true
// };
