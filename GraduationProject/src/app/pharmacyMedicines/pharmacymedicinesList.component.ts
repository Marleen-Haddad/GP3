import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PharmacyMedicinesService, PharmacyService , PharmacyBranchesService, MedicineService} from '@app/_services';
import { Pharmacy ,Medicine,PharmacyBranches,PharmacyMedicines} from '@app/_models';
@Component({ templateUrl: 'pharmacymedicinesList.component.html' })
export class PharmacyMedicinesListComponent implements OnInit {
  pharmacyMedicines= [];
  pharmacies: Pharmacy[] = [];
  medicines: Medicine[] = [];
  pharmacyBranches:PharmacyBranches[]=[];
  constructor(private medicinesService : MedicineService,private pharmacyBranchesService:PharmacyBranchesService,private pharmacyMedicinesService: PharmacyMedicinesService, private pharmacyService: PharmacyService,
  ) { }

  ngOnInit() {
    this.pharmacyMedicinesService.getAll()
      .pipe(first())
      .subscribe(pharmacyMedicines => this.pharmacyMedicines = pharmacyMedicines);
    this.pharmacyService.getAll()
      .pipe(first())
      .subscribe(pharmacies => this.pharmacies = pharmacies);

      this.medicinesService.getAll()
      .pipe(first())
      .subscribe(medicines => this.medicines = medicines);

      this.pharmacyBranchesService.getAll()
      .pipe(first())
      .subscribe(pharmacyBranches => this.pharmacyBranches = pharmacyBranches);
  }

  deletePharmacyMedicine(id: string) {
    const pharmacyMedicine = this.pharmacyMedicines.find(x => x.id === id);
    pharmacyMedicine.isDeleting = true;
    this.pharmacyMedicinesService.delete(id)
      .pipe(first())
      .subscribe(() => this.pharmacyMedicines = this.pharmacyMedicines.filter(x => x.id !== id));
  }

  GetPharmacyName(pharmacyBranchId: string) {
    const pharmacyBranch=this.pharmacyBranches.find(p=>p.id==pharmacyBranchId);
    const pharmacy = this.pharmacies.find(p => p.id == pharmacyBranch.pharmacyId);
    return pharmacy.name + "-"+pharmacyBranch.name;
  }
  GetMedicineName(medicineId: string){
    const medicine=this.medicines.find(m=>m.id==medicineId);
    return medicine.name;
  }

  GetMedicinePrice(medicineId: string){
    const medicine=this.medicines.find(m=>m.id==medicineId);
    return medicine.price;
  }
}
