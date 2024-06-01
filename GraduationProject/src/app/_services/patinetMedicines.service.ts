import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { PatinetMedicines } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PatinetMedicinesService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }





    create(patinetMedicines: PatinetMedicines) {
      return this.http.post(`${environment.apiUrl}/patinetMedicines/create`, patinetMedicines);
    }

    getAll() {
        return this.http.get<PatinetMedicines[]>(`${environment.apiUrl}/patinetMedicines`);
    }

    getByDescriptionId(descriptionId: string) {
        return this.http.get<PatinetMedicines[]>(`${environment.apiUrl}/patinetMedicines/${descriptionId}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/patinetMedicines/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/patinetMedicines/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
