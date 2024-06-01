import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { PatinetDescription } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PatinetDescriptionService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }





    create(patinetDescription: PatinetDescription) {
      return this.http.post(`${environment.apiUrl}/patinetDescription/create`, patinetDescription);
    }

    getAll() {
        return this.http.get<PatinetDescription[]>(`${environment.apiUrl}/patinetDescription`);
    }

    getById(id: string) {
        return this.http.get<PatinetDescription>(`${environment.apiUrl}/patinetDescription/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/patinetDescription/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/patinetDescription/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
