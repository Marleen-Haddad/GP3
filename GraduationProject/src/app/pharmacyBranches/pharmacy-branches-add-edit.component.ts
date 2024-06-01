import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { PharmacyBranchesService,PharmacyService, AlertService } from '@app/_services';
import{ Pharmacy } from '@app/_models';
@Component({ templateUrl: 'pharmacy-branches-add-edit.component.html' })
export class PharmacyBranchesAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    pharmacies:Pharmacy[];
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private pharmacyBranchesService: PharmacyBranchesService,
        private pharmacyService: PharmacyService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
      this.pharmacyService.getAll()
      .pipe(first())
      .subscribe(pharmacies => this.pharmacies = pharmacies);

        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            pharmacyId: ['', Validators.required],
            name: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.pharmacyBranchesService.getById(this.id)
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
            this.createPharmacyBranch();
        } else {
            this.updatePharmacyBranch();
        }
    }

    private createPharmacyBranch() {
        this.pharmacyBranchesService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Branch added successfully to pharmacy', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updatePharmacyBranch() {
        this.pharmacyBranchesService.update(this.id, this.form.value)
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
}
