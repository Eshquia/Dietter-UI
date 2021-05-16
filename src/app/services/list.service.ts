import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'app/models/client';
import { Food } from 'app/models/food';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  baseUrl = environment.baseUrl + "List"
  constructor(private http: HttpClient) { }

  getLists(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl+"/getList"}`).pipe(
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
}
