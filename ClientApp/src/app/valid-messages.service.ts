import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidMessagesService {

    constructor() { }

    showErrorMessage(errors): string {
        if (errors.required) {
            return "Pole wymagane";
        }
        else if (errors.pattern) {
            return "Niewłaściwy format";
        }
        else {
            return "";
        }
    }
}
