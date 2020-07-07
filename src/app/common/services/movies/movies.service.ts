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

export interface Pelicula {
  id: number;
  titulo: string;
  sinopsis: string;
  generoId: number;
  director: string;
  fechaEstreno: string;
  appUserId: number;
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

  filtrarPeliculas(keyword, genero = null): Observable<Pelicula[]> {

    let url = genero !== null ? this.baseUrl+"/peliculas/Search?keyword="+keyword+"&genero="+genero : this.baseUrl+"/peliculas/Search?keyword="+keyword;
    return new Observable<Pelicula[]>(observer => {
      this.http.get<any>(url)
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

  guardarPelicula(movie){

    return new Observable<Pelicula>(observer => {

      let user_id = localStorage.getItem("user_id");
      movie.appUserId = user_id;
      delete movie.id; delete movie.director;

      let token = localStorage.getItem("token");
      this.http.post<any>(`${this.baseUrl}peliculas`, movie)
        .subscribe(
          (response) => {
            observer.next(response);
            this.initMessage('Movie saved!');
          },
          (error) => {
            const errorResponse = error.error;

            if (errorResponse.error && errorResponse.error.statusCode) {
              switch (errorResponse.error.statusCode) {
                case 401: {
                  this.initMessage('Request failed, Unauthorized');
                  break;
                }
                default: {
                  this.initMessage('Request failed');
                }
              }
            } else {
              this.initMessage('Request failed');
            }

            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
    });
  }

  borrarPelicula(movie): Observable<Pelicula> {

    return new Observable<Pelicula>(observer => {

      let user_id = localStorage.getItem("user_id");
      if(parseInt(user_id) !== movie.appUserId){

        this.initMessage('No permissions for this action!');
        observer.error('No permissions for this action!');
        observer.complete();
      }
      else{

        this.http.delete<any>(`${this.baseUrl}peliculas/${movie.id}`)
          .subscribe(
            (response) => {
              observer.next(response);
              this.initMessage('Movie deleted!');
            },
            (error) => {
              const errorResponse = error.error;

              if (errorResponse.error && errorResponse.error.statusCode) {
                switch (errorResponse.error.statusCode) {
                  case 401: {
                    this.initMessage('Request failed, Unauthorized');
                    break;
                  }
                  default: {
                    this.initMessage('Request failed');
                  }
                }
              } else {
                this.initMessage('Request failed');
              }

              observer.error(error);
            },
            () => {
              observer.complete();
            }
          );
      }
    });
  }

}
