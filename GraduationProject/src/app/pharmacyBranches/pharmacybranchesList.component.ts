import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PharmacyBranchesService, PharmacyService } from '@app/_services';
import { Pharmacy } from '@app/_models';
@Component({ templateUrl: 'pharmacybranchesList.component.html' })
export class PharmacyBranchesListComponent implements OnInit {
  pharmacyBranches = null;
  pharmacies: Pharmacy[] = null;
  constructor(private pharmacyBranchesService: PharmacyBranchesService, private pharmacyService: PharmacyService,
  ) { }

  ngOnInit() {
    this.pharmacyBranchesService.getAll()
      .pipe(first())
      .subscribe(pharmacyBranches => this.pharmacyBranches = pharmacyBranches);
    this.pharmacyService.getAll()
      .pipe(first())
      .subscribe(pharmacies => this.pharmacies = pharmacies);
  }

  deletePharmacy(id: string) {
    const pharmacyBranch = this.pharmacyBranches.find(x => x.id === id);
    pharmacyBranch.isDeleting = true;
    this.pharmacyBranchesService.delete(id)
      .pipe(first())
      .subscribe(() => this.pharmacyBranches = this.pharmacyBranches.filter(x => x.id !== id));
  }

  GetPharmacyName(id: string) {
    const pharmacy = this.pharmacies.find(p => p.id == id);
    return pharmacy.name;
  }
}
