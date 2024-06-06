import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {
  PatinetDescriptionService,
  AccountService,
  PatinetMedicinesService,
  PharmacyMedicinesService,
} from '@app/_services';

@Component({ templateUrl: 'patientDescriptionList.component.html' })
export class PatientDescriptionListComponent implements OnInit {
  patinetDescriptions = null;
  currentUser;
  constructor(
    private patinetDescriptionService: PatinetDescriptionService,
    private accountService: AccountService,
    private patinetMedicinesService: PatinetMedicinesService,
    private pharmacyMedicinesService: PharmacyMedicinesService
  ) {}

  ngOnInit() {
    this.accountService.user.subscribe((x) => {
      this.currentUser = x;
      this.patinetDescriptionService
        .getAll()
        .pipe(first())
        .subscribe((patinetDescriptions) => {
          if (this.currentUser.userRole == 'Patient') {
            this.patinetDescriptions = patinetDescriptions.filter(
              (d) => d.patientId == this.currentUser.id
            );
          }
          if (this.currentUser.userRole == 'Physician') {
            this.accountService
              .getAll()
              .pipe(first())
              .subscribe((users) => {
                const patientUsers = users.filter(
                  (u) => u.userRole === 'Patient'
                );
                this.patinetDescriptions = patinetDescriptions.filter((d) =>
                  patientUsers.some((p) => p.id === d.patientId)
                );
              });
          }
          if (this.currentUser.userRole == 'Pharmacist') {
            this.pharmacyMedicinesService
              .getAll()
              .pipe(first())
              .subscribe((pharmacyMedicines) => {
                const pharmacyMedicinesUser = pharmacyMedicines.filter(
                  (m) => m.pharmacyBranchId == this.currentUser.userPharmacy
                );
                this.patinetMedicinesService
                  .getAll()
                  .pipe(first())
                  .subscribe((pm) => {
                    const patinetMedicines = pm.filter((pm) =>
                      pharmacyMedicinesUser.some(
                        (p) => p.id == pm.pharmacyMedicinesId
                      )
                    );
                    this.patinetDescriptions = patinetDescriptions.filter((d) =>
                      patinetMedicines.some((p) => p.descriptionId== d.id)
                    );
                  });
              });

          } else {
            this.patinetDescriptions = patinetDescriptions;
          }
        });
    });
  }

  deletePatientDescription(id: string) {
    const description = this.patinetDescriptions.find((x) => x.id === id);
    description.isDeleting = true;
    this.patinetDescriptionService
      .delete(id)
      .pipe(first())
      .subscribe(
        () =>
          (this.patinetDescriptions = this.patinetDescriptions.filter(
            (x) => x.id !== id
          ))
      );
  }
}
