import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { MedicineService } from '@app/_services';

@Component({ templateUrl: 'medicineList.component.html' })
export class MedicinesListComponent implements OnInit {
  medicines = null;
  constructor(private medicineService: MedicineService
  ) { }

  ngOnInit() {
    this.medicineService.getAll()
      .pipe(first())
      .subscribe(medicines => this.medicines = medicines);

  }

  deleteMedicine(id: string) {
    const pharmacyBranch = this.medicines.find(x => x.id === id);
    pharmacyBranch.isDeleting = true;
    this.medicineService.delete(id)
      .pipe(first())
      .subscribe(() => this.medicines = this.medicines.filter(x => x.id !== id));
  }

  GetPharmacyName(id: string) {
    const pharmacy = this.medicines.find(p => p.id == id);
    return pharmacy.name;
  }
}
