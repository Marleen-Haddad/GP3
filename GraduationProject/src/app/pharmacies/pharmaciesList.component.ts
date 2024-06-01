import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PharmacyService } from '@app/_services';

@Component({ templateUrl: 'pharmaciesList.component.html' })
export class PharmaciesListComponent implements OnInit {
  pharmacies = null;

    constructor(private pharmacyService: PharmacyService) {}

    ngOnInit() {
        this.pharmacyService.getAll()
            .pipe(first())
            .subscribe(pharmacies => this.pharmacies = pharmacies);
    }

    deletePharmacy(id: string) {
        const pharmacy = this.pharmacies.find(x => x.id === id);
        pharmacy.isDeleting = true;
        this.pharmacyService.delete(id)
            .pipe(first())
            .subscribe(() => this.pharmacies = this.pharmacies.filter(x => x.id !== id));
    }
}
