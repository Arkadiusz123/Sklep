import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T>{
    private baseUrl: string = window.location.origin;

    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    getList(controllerName: string): Observable<T[]> {
        return this.httpClient.get<T[]>(this.baseUrl + `/${controllerName}/GetList`);
    }

    addItem(item: T, controllerName: string): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + `/${controllerName}/Add`, item, {headers: this.authService.getHeaders()});
    }

    editItem(id: string, item: T, controllerName: string): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + `/${controllerName}/Edit/${id}`, item);
    }

    getItem(id: string, controllerName: string): Observable<T> {
        return this.httpClient.get<T>(this.baseUrl + `/${controllerName}/GetObject/${id}`);
    }
}
