import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'app/models/client';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ClientService {
  baseUrl = environment.baseUrl + "Client"
  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl + '/Clients'}`).pipe(
      catchError(this.error)
    );
  }

  addClients(client: Client): Observable<any> {
    const body = { clientName: client.clientName, clientId: this.getRandomArbitrary(10000, 99999) };
    return this.http.post<any>(`${this.baseUrl + '/postClient'}`, body).pipe(
      catchError(this.error)
    );
  }

  updateClients(client: Client): Observable<any> {
    const body = { clientName: client.clientName, clientId: client.clientId };
    return this.http.put<any>(`${this.baseUrl + '/putClient'}`, body).pipe(
      catchError(this.error)
    );
  }

  deleteClients(id): Observable<any> {
    console.log(id);
    return this.http.delete<any>(`${this.baseUrl + '/'+id}`).pipe(
      catchError(this.error)
    );
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createDiet(diet){
    const body = { calorie: diet.calorie, thatDay: diet.thatDay, clientId: diet.clientId, snacks:diet.snacks };
    return this.http.post<any>(`${this.baseUrl + '/createDiet'}`, body).pipe(
      catchError(this.error)
    );
  }


}
