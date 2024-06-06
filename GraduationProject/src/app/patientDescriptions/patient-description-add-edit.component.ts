import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PatinetDescriptionService, AlertService, AccountService, PharmacyBranchesService, MedicineService, PharmacyService, PatinetMedicinesService, PharmacyMedicinesService } from '@app/_services';

@Component({ templateUrl: 'patient-description-add-edit.component.html' })
export class PatinetDescriptionsAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  users = [];
  currentPatinetMedicines = [];

  oldPatinetMedicines = [];

  pharmacyMedicines = [];
  pharmacies = [];
  medicines = [];
  pharmacyBranches = [];
  pharmacyMedicinesForPharmacy=[];
  currentUser = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patinetDescriptionService: PatinetDescriptionService,
    private patinetMedicinesService: PatinetMedicinesService,
    private alertService: AlertService,
    private accountService: AccountService,
    private pharmacyMedicinesService: PharmacyMedicinesService,
    private pharmacyService: PharmacyService,
    private medicinesService: MedicineService,
    private pharmacyBranchesService: PharmacyBranchesService,
  ) { }



  ngOnInit() {
    this.accountService.user.subscribe(x => this.currentUser = x);
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users.filter(u=>u.userRole=='Patient'));
    this.form = this.formBuilder.group({
      patientId: ['', Validators.required],
      description : ['', Validators.required],
      medicineDescription: ['', Validators.required]
    });
    this.pharmacyBranchesService.getAll()
      .pipe(first())
      .subscribe(pharmacyBranches => this.pharmacyBranches = pharmacyBranches);
    this.pharmacyMedicinesService.getAll()
      .pipe(first())
      .subscribe(pharmacyMedicines => this.pharmacyMedicines = pharmacyMedicines);

    this.pharmacyService.getAll()
      .pipe(first())
      .subscribe(pharmacies => this.pharmacies = pharmacies);

    this.medicinesService.getAll()
      .pipe(first())
      .subscribe(medicines => this.medicines = medicines);
    this.form = this.formBuilder.group({
      patientId: ['', Validators.required],
      description:['', Validators.required],
      medicineDescription: ['', Validators.required]
    });
    if (!this.isAddMode) {
      this.patinetDescriptionService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
      this.patinetMedicinesService.getByDescriptionId(this.id)
        .pipe(first())
        .subscribe(patinetMedicines => {
          this.currentPatinetMedicines = patinetMedicines;
          this.oldPatinetMedicines = patinetMedicines;
        });
    }

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  selected: string = '';
  pselected: string = '';
  Selected(event: any) {

    this.selected = event.target.value;

  }

  updatePatientMedicine: boolean = false;
  public editPatientMedicine(patientMedicine) {
    const selectMedicineBranch= this.pharmacyMedicines.find(pm=>pm.id==patientMedicine.pharmacyMedicinesId)
    this.pselected=selectMedicineBranch.pharmacyBranchId
    this.pharmacyMedicinesForPharmacy= this.pharmacyMedicines.filter(p=>p.pharmacyBranchId == this.pselected)
    this.selected = patientMedicine.pharmacyMedicinesId;
    this.inssuranceSelected = patientMedicine.insuranceAccept;
    this.updatePatientMedicine = true;
  }

  inssuranceSelected: boolean = false;
  InssuranceSelected(event: any) {
    this.inssuranceSelected = event.target.value;
  }

  onSubmit(saveDecription: boolean) {
    if (saveDecription) {
      this.submitted = true;

      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
        return;
      }

      this.loading = true;
      if (this.isAddMode) {
        this.createPatinetDescription();
        //this.createPatinetMedicines();
      } else {
        this.updatePatinetDescription();
        this.deletePatientMedicnes();
        this.createPatinetMedicines();
      }
    }
    else {
      this.AddUpdatePatientMedicine();
    }
  }

  private createPatinetDescription() {
    this.patinetDescriptionService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.id=(result as any).id
          this.currentPatinetMedicines.forEach(m => {
            m.descriptionId=this.id.toString()
            this.patinetMedicinesService.create(m)
              .pipe(first())
              .subscribe({
                next: () => {

                },
                error: error => {
                  this.alertService.error(error);
                  this.loading = false;
                }
              });
          });
          this.alertService.success(this.isAddMode ? 'PatinetDescription added successfully' : 'PatinetDescription updated successfully', { keepAfterRouteChange: true });
          this.router.navigate(['/patientDescription'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private createPatinetMedicines() {
    this.currentPatinetMedicines.forEach(m => {
      this.patinetMedicinesService.create(m)
        .pipe(first())
        .subscribe({
          next: () => {

          },
          error: error => {
            this.alertService.error(error);
            this.loading = false;
          }
        });
    });
    this.alertService.success(this.isAddMode ? 'PatinetDescription added successfully' : 'PatinetDescription updated successfully', { keepAfterRouteChange: true });
    this.router.navigate(['/patientDescription'], { relativeTo: this.route });

  }

  private deletePatientMedicnes() {
    this.oldPatinetMedicines.forEach(m => {
      this.patinetMedicinesService.delete(m.id)
        .pipe(first())
        .subscribe({
          next: () => {

          },
          error: error => {
            // this.alertService.error(error);
            // this.loading = false;
          }
        });
    });
  }
  private updatePatinetDescription() {
    debugger
    this.patinetDescriptionService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  public AddUpdatePatientMedicine() {
    if (!this.updatePatientMedicine) {
      this.currentPatinetMedicines.push({
        id: '',
        descriptionId: this.isAddMode ? '0' : this.id,
        pharmacyMedicinesId: this.selected,
        insuranceAccept: this.inssuranceSelected
      });
    }
    else {
      this.currentPatinetMedicines = this.currentPatinetMedicines.filter(m => m.pharmacyMedicinesId != this.selected);
      this.currentPatinetMedicines.push({
        id: '',
        descriptionId: this.isAddMode ? '0' : this.id,
        pharmacyMedicinesId: this.selected,
        insuranceAccept: this.inssuranceSelected
      });
      this.updatePatientMedicine=false;
    }
  }

  GetPharmacyName(pharmacyBranchId: string) {
    const pharmacyBranch = this.pharmacyBranches.find(p => p.id == pharmacyBranchId);
    const pharmacy = this.pharmacies.find(p => p.id == pharmacyBranch.pharmacyId);
    return pharmacy?.name + "-" + pharmacyBranch?.name;
  }
  GetMedicineName(medicineId: string) {
    const medicine = this.medicines.find(m => m.id == medicineId);
    return medicine?.name;
  }
  GetMedicineFullNameFromPharmacyMedicineId(pharmacyMedicineId) {
    const pharmacyMedicine = this.pharmacyMedicines.find(m => m.id == pharmacyMedicineId);
    return this.GetMedicineName(pharmacyMedicine.medicineId) + '/' + this.GetPharmacyName(pharmacyMedicine.pharmacyBranchId);
  }

  deletePatientMedicine(pharmacyMedicinesId) {
    this.currentPatinetMedicines = this.currentPatinetMedicines.filter(pm => pm.pharmacyMedicinesId != pharmacyMedicinesId);

  }
  SelectPharmacyMedicines(event){
    const selectedBranchId = (event.target as HTMLSelectElement).value;
    this.pharmacyMedicinesForPharmacy= this.pharmacyMedicines.filter(p=>p.pharmacyBranchId == selectedBranchId)
  }

}
