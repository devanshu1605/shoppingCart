import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Library } from './Library';
import { Books } from './Books';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SuccessComponent } from './SuccessResponse';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  libraryListUrl = "http://localhost:8080/getlibraries";
  bookListUrl = "http://localhost:8080/getBooks";
  bookAddorUpdateUrl = "http://localhost:8080/addOrUpdateBooks";

  libraries: Library[];
  

  constructor(private httpClient: HttpClient) {

  }

  getLibraries(): Observable<Library[]> {
    const headers = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "*");
    console.log(" getLibraries called");
    return this.httpClient.get<Library[]>(
      this.libraryListUrl, {headers}).pipe(tap(data => {
        console.log(
          'All: ' + JSON.stringify(data));
        this.libraries = data;
      }
    ),
        catchError(this.handleError));
  }

  getBooks(id: number): Observable<Books[]> {
    const headers = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "http://localhost:4200");
    
    console.log(" getbooks called for library Id "+id);
   
    return this.httpClient.get<Books[]>(
      this.bookListUrl, { headers }).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError));
  }
  
  addBooks(book: Books): Observable<SuccessComponent>{
    const headers = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "http://localhost:4200");
    headers.set('content-type', 'application/json');
    this.bookAddorUpdateUrl += "/addbook";
    return this.httpClient.post<SuccessComponent>(this.bookAddorUpdateUrl, JSON.stringify(book), { headers })
      .pipe(tap(data => console.log(" book " + JSON.stringify(data))),
        catchError(this.handleError));
  }

  updateBooks(book: Books): Observable<SuccessComponent> {
    const headers = new HttpHeaders()
      .set("Access-Control-Allow-Origin", "http://localhost:4200");
    headers.set('content-type', 'application/json');
    this.bookAddorUpdateUrl += "/updateBook";
    return this.httpClient.post<SuccessComponent>(this.bookAddorUpdateUrl,
      JSON.stringify(book), { headers }).pipe(
        tap(data => console.log(" book " + JSON.stringify(data))),
        catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = '';
    if (err.error instanceof ErrorEvent) {
      errorMsg = `An error occured: ${err.error.message}`;
    } else {
      errorMsg = `Server Returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error("My error Message " + errorMsg);
    return throwError(errorMsg);
  }

}
