import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { PharmacyBranches } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PharmacyBranchesService {


    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    create(pharmacyBranch: PharmacyBranches) {
      return this.http.post(`${environment.apiUrl}/pharmacyBranches/create`, pharmacyBranch);
    }

    getAll() {
        return this.http.get<PharmacyBranches[]>(`${environment.apiUrl}/pharmacyBranches`);
    }

    getById(id: string) {
        return this.http.get<PharmacyBranches>(`${environment.apiUrl}/pharmacyBranches/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/pharmacyBranches/${id}`, params)
            .pipe(map(x => {
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/pharmacyBranches/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}
