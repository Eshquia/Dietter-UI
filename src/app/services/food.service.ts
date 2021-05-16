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
 
export class FoodService {
  baseUrl = environment.baseUrl + "Foods"
  constructor(private http: HttpClient) { }

  getFoods(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`).pipe(
      catchError(this.error)
    );
  }

  addFood(food: Food): Observable<any> {
    const body = { 
        id: this.getRandomArbitrary(10000, 99999),
        foodName: food.foodName,
        foodTypeName: food.foodTypeName,
        calorie: food.calorie,
        foodType:food.foodType
    };
    return this.http.post<any>(`${environment.baseUrl + 'PostFood'}`, body).pipe(
      catchError(this.error)
    );
  }

  updateFood(food: Food): Observable<any> {
    const body = { 
      id: food.id,
      foodName: food.foodName,
      foodTypeName: food.foodTypeName,
      calorie: food.calorie,
      foodType:food.foodType
  };
    return this.http.put<any>(`${environment.baseUrl  + 'putFood'}`, body).pipe(
      catchError(this.error)
    );
  }

  deleteFood(id): Observable<any> {
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


}
