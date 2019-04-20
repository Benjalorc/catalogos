import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface LoginUser {
  email: string;
  password: string;
  remember: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  private initMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }

  private parserResponseSuccess({ id, userId, created }, remember: boolean): void {
    const storage = remember
      ? localStorage
      : sessionStorage;

    storage.setItem('token', id);
    storage.setItem('login_date', created);
    storage.setItem('user_id', userId);
  }

  login({ email, password, remember }: LoginUser): Observable<any> {
    return new Observable<any>(observer => {
      this.http.post<any>(`${this.baseUrl}AppUsers/login`, { email, password })
        .subscribe(
          (response) => {
            this.parserResponseSuccess(response, remember);
            observer.next(response);

            // TODO: Ruta redired al hacer login 'CHANGE: catalogos to router path'
            // this.router.navigate(['catalogos']);
          },
          (error) => {
            const errorResponse = error.error;

            if (errorResponse.error && errorResponse.error.statusCode) {
              switch (errorResponse.error.statusCode) {
                case 401: {
                  this.initMessage('login failed, Unauthorized');
                  break;
                }
                default: {
                  this.initMessage('login failed');
                }
              }
            } else {
              this.initMessage('login failed');
            }

            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
    });
  }

}
