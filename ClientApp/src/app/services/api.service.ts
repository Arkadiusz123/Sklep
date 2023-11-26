import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService<T>{
    private baseUrl: string = window.location.origin;
    private objectsSubject = new BehaviorSubject<T[]>(null);

    constructor(private httpClient: HttpClient, private authService: AuthService, private errorHandler: ErrorHandlerService) {
    }

    private fetchData(controllerName: string): void {
        this.httpClient.get<T[]>(this.baseUrl + `/${controllerName}/GetList`, { headers: this.authService.getHeaders() })
            .subscribe(
                success => this.objectsSubject.next(success),
                error => this.errorHandler.handleError(error)
            );
    }

    getList(controllerName: string): Observable<T[]> {

        if(this.objectsSubject.getValue() == null){
            this.fetchData(controllerName);
        }
        return this.objectsSubject.asObservable();
    }

    addItem(item: T, controllerName: string): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + `/${controllerName}/Add`, item, { headers: this.authService.getHeaders() })
        .pipe(
            tap(() => {
                const currentList = this.objectsSubject.value;
                currentList.push(item);                  
                this.objectsSubject.next(currentList);
            }));
    }

    editItem(id: string, item: T, controllerName: string, idPropName: string): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl + `/${controllerName}/Edit/${id}`, item, { headers: this.authService.getHeaders() })
        .pipe(
            tap(() => {
                const currentList = this.objectsSubject.value;
                let updated = currentList.find(x => x[idPropName] == +id);
                let index = currentList.indexOf(updated);
                currentList[index] = item;
                   
                this.objectsSubject.next(currentList);
            }));
    }

    getItem(id: string, controllerName: string): Observable<T> {
        return this.httpClient.get<T>(this.baseUrl + `/${controllerName}/GetObject/${id}`, { headers: this.authService.getHeaders() });
    }

    deleteItem(id: string, controllerName: string, idPropName: string) {
        return this.httpClient.delete(this.baseUrl + `/${controllerName}/Delete/${id}`, { headers: this.authService.getHeaders() }).pipe(
            tap(() => {
                const currentObjects = this.objectsSubject.value;
                const updatedObjects = currentObjects.filter(x => x[idPropName] != id);
                this.objectsSubject.next(updatedObjects);
            })
        );
    }
}
