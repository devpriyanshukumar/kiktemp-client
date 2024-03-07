import { BroadcastService } from './broadcast.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private broadCastService: BroadcastService
  ) { }

  get<T>(path: string, params: HttpParams = new HttpParams(), showErrors: boolean = true): Observable<T> {
    // Remove duplicate slash
    path = path.replace(/([^:]\/)\/+/g, '$1');

    return this.httpClient.get<T>(path, { headers: this.setHeaders(), params, withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err, showErrors);

        // return a default fallback value so app can continue
        return this.formatErrors(err);
      })
    );
  }

  post<T>(path: string, body: object = {}, showErrors: boolean = true): Observable<T> {
    // Remove duplicate slash
    path = path.replace(/([^:]\/)\/+/g, '$1');

    return this.httpClient.post<T>(path, body, { headers: this.setHeaders(), withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err, showErrors);

        // return a default fallback value so app can continue
        return this.formatErrors(err);
      })
    );
  }

  delete<T>(path: string, params: HttpParams = new HttpParams(), showErrors: boolean = true): Observable<T> {
    // Remove duplicate slash
    path = path.replace(/([^:]\/)\/+/g, '$1');

    return this.httpClient.delete<T>(path, { headers: this.setHeaders(), params, withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err, showErrors);

        // return a default fallback value so app can continue
        return this.formatErrors(err);
      })
    );
  }

  put<T>(path: string, body: any, params: HttpParams = new HttpParams(), showErrors: boolean = true): Observable<T> {
    // Remove duplicate slash
    path = path.replace(/([^:]\/)\/+/g, '$1');

    return this.httpClient.put<T>(path, body, { headers: this.setHeaders(), params, withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleError(err, showErrors);

        // return a default fallback value so the app can continue
        return this.formatErrors(err);
      })
    );
  }

  private setHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    const token = sessionStorage.getItem('bearerToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private formatErrors(err: HttpErrorResponse) {
    return of<any>(
      {
        isSuccess: false,
        status: err.status,
        message: err.error && err.error.messageDetails ? err.error.messageDetails : 'Something went wrong...',
        data: err.error
      });
  }

  private handleError(err: HttpErrorResponse, showErrors: boolean = true): Observable<any> {
    if (err.error instanceof ErrorEvent) {
      console.error('Client-side error :', err.error.message);
      this.broadCastService.broadcast('CLIENT_SIDE_NETWORK_ERROR', err);
      return of({ isSuccess: false, errorMessage: 'Client-side error occurred.' });
    } else if (err.status !== 0) {
      console.error(`Server-side error : ${err.status}, ${err.statusText}`);
      this.broadCastService.broadcast('SERVER_ERROR', err);
      return of({ isSuccess: false, errorMessage: 'Server error occurred.' });
    }
    // Return null or an empty observable when err.status is 0
    return of(null);
  }
}
