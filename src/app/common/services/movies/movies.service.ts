import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface Genero {
  id: number;
  nombre: string;
  descripcion: string;
}
export interface ListadoGeneros {
  listado: Genero[]
}

export interface Pelicula {
  id: number;
  titulo: string;
  sinopsis: string;
  generoId: number;
  director: string;
  fechaEstreno: string;
  idAppUser: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly baseUrl = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  private initMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  listarGeneros(): Observable<ListadoGeneros> {
    return new Observable<ListadoGeneros>(observer => {
      this.http.get<any>(`${this.baseUrl}generos`)
        .subscribe(
          (response) => {
            observer.next(response);
            this.initMessage('Genres found!');
          },
          (error) => {
            const errorResponse = error.error;

            if (errorResponse.error && errorResponse.error.statusCode) {
              switch (errorResponse.error.statusCode) {
                case 401: {
                  this.initMessage('Search failed, Unauthorized');
                  break;
                }
                default: {
                  this.initMessage('Search failed');
                }
              }
            } else {
              this.initMessage('Search failed');
            }

            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
    });
  }


  listarPeliculas(genero): Observable<Pelicula[]> {
    return new Observable<Pelicula[]>(observer => {
      this.http.get<any>(`${this.baseUrl}generos/${genero}/peliculas`)
        .subscribe(
          (response) => {
            observer.next(response);
            this.initMessage('Movies found!');
          },
          (error) => {
            const errorResponse = error.error;

            if (errorResponse.error && errorResponse.error.statusCode) {
              switch (errorResponse.error.statusCode) {
                case 401: {
                  this.initMessage('Search failed, Unauthorized');
                  break;
                }
                default: {
                  this.initMessage('Search failed');
                }
              }
            } else {
              this.initMessage('Search failed');
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
