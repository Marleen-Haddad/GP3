import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Medicine } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class MedicineService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }





    create(medicine: Medicine) {
      return this.http.post(`${environment.apiUrl}/medicines/create`, medicine);
    }

    getAll() {
        return this.http.get<Medicine[]>(`${environment.apiUrl}/medicines`);
    }

    getById(id: string) {
        return this.http.get<Medicine>(`${environment.apiUrl}/medicines/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/medicines/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/medicines/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
