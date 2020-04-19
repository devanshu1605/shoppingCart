import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from './product';
import { Observable, throwError } from 'rxjs';
import { catchError, tap,map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class ProductService {
  productUrl = "https://232765a1-74e0-418d-b554-249f844f3978.mock.pstmn.io";

  constructor(private httpClient:HttpClient) {

  }

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      this.productUrl).pipe(tap(data => console.log(
        'All: ' + JSON.stringify(data))),
        catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = '';
    if (err.error instanceof ErrorEvent) {
      errorMsg = `An error occured: ${err.error.message}`;
    } else {
      errorMsg = `Server Returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error("My error Message "+errorMsg);
    return throwError(errorMsg);
  }
    
  }
