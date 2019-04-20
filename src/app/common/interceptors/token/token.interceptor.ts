import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private readonly serverUrl = environment.url;

  private get token(): string {
    return localStorage.getItem('token')
      || sessionStorage.getItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token;

    if (!req || !req.url || (/^http/.test(req.url) && !(this.serverUrl && req.url.startsWith(this.serverUrl)))) {
      return next.handle(req);
    }

    if (!!token) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(req);
  }
}
