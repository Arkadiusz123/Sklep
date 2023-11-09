import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T>{
    private baseUrl: string = window.location.origin;

    constructor(private httpClient: HttpClient) {
    }

    getList(controllerName: string): Observable<T[]> {
        return this.httpClient.get<T[]>(this.baseUrl + `/${controllerName}/GetList`);
    }

    addItem(item: T, controllerName: string): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + `/${controllerName}/Add`, item);
    }

    editItem(id: string, item: T, controllerName: string): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + `/${controllerName}/Edit/${id}`, item);
    }

    getItem(id: string, controllerName: string): Observable<T> {
        return this.httpClient.get<T>(this.baseUrl + `/${controllerName}/GetObject/${id}`);
    }
}
