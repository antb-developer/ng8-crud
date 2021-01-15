import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let httpOptions = {
      headers: new HttpHeaders({
        'x-client-id': '12345'
      })
    };
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly apiURL = 'https://ballistictest.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) {}

  public post(path: string, data) {
    return this.httpClient.post(`${this.apiURL}/${path}`, data, httpOptions).pipe(catchError(this.handleError));
  }

  public get(path: string) {
    return this.httpClient.get(`${this.apiURL}/${path}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error)}`);
      if (error.status === 400) {
        return throwError(error.error);
      }
    }
    return throwError('errors.internal-server-error');
  }

}
