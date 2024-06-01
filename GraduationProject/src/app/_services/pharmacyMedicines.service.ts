import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { PharmacyMedicines } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PharmacyMedicinesService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    create(PharmacyMedicine: PharmacyMedicines) {
      return this.http.post(`${environment.apiUrl}/pharmacyMedicines/create`, PharmacyMedicine);
    }

    getAll() {
        return this.http.get<PharmacyMedicines[]>(`${environment.apiUrl}/pharmacyMedicines`);
    }

    getById(id: string) {
        return this.http.get<PharmacyMedicines>(`${environment.apiUrl}/pharmacyMedicines/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/pharmacyMedicines/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/pharmacyMedicines/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
