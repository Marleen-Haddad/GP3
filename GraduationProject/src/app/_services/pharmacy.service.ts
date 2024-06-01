import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Pharmacy } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PharmacyService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }





    create(pharmacy: Pharmacy) {
      return this.http.post(`${environment.apiUrl}/pharmacies/create`, pharmacy);
    }

    getAll() {
        return this.http.get<Pharmacy[]>(`${environment.apiUrl}/pharmacies`);
    }

    getById(id: string) {
        return this.http.get<Pharmacy>(`${environment.apiUrl}/pharmacies/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/pharmacies/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/pharmacies/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
