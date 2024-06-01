import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PharmacyMedicinesService,PharmacyService, AlertService,PharmacyBranchesService,MedicineService } from '@app/_services';
import{ Pharmacy , PharmacyBranches,Medicine} from '@app/_models';
@Component({ templateUrl: 'pharmacy-medicines-add-edit.component.html' })
export class PharmacyMedicinesAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    pharmacies:Pharmacy[];
    pharmacyBranches:PharmacyBranches[];
    medicines:Medicine[]
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private pharmacyMedicinesService: PharmacyMedicinesService,
        private pharmacyService: PharmacyService,
        private pharmacyBranchesService: PharmacyBranchesService,
        private medicineService:MedicineService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
      this.pharmacyService.getAll()
      .pipe(first())
      .subscribe(pharmacies => this.pharmacies = pharmacies);

      this.pharmacyBranchesService.getAll()
      .pipe(first())
      .subscribe(pharmacyBranches => this.pharmacyBranches = pharmacyBranches);

      this.medicineService.getAll()
      .pipe(first())
      .subscribe(medicines => this.medicines = medicines);

        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
           pharmacyBranchId: ['', Validators.required],
           medicineId: ['', Validators.required],
           quantity:  ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.pharmacyMedicinesService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createPharmacyMedicine();
        } else {
            this.updatePharmacyMedicine();
        }
    }

    private createPharmacyMedicine() {
        this.pharmacyMedicinesService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Medicine added successfully to pharmacy', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updatePharmacyMedicine() {
        this.pharmacyMedicinesService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    GetFullName(pharmacyBranch : PharmacyBranches){
      const pharmacy = this.pharmacies.find(p=>p.id ==  pharmacyBranch.pharmacyId);
      return pharmacy.name + "-" + pharmacyBranch.name ;
    }
}
