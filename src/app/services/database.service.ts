import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  token: String;
  API_URL = env.API_URL;
  httpOptions: any = {};
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("access_token");
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }

  public post(uri: string, value) {
    return this.http.post(`${this.API_URL}${uri}`, value, this.httpOptions).pipe(catchError(this.handleError));
  }

  public get(uri: string) {
    return this.http.get(this.API_URL + uri, this.httpOptions).pipe(catchError(this.handleError));
  }

  public put(uri: string, value) {
    return this.http.put(this.API_URL + uri, value, this.httpOptions);
  }

  public delete(uri: string, value?: any) {
    return this.http.delete(this.API_URL + uri, value).pipe(catchError(this.handleError));
  }

  public patch(uri: string, value) {
    return this.http.patch(this.API_URL + uri, value, this.httpOptions).pipe(catchError(this.handleError));
  }
}
