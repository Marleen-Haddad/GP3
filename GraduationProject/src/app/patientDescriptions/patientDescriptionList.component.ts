﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PatinetDescriptionService, AccountService } from '@app/_services';

@Component({ templateUrl: 'patientDescriptionList.component.html' })
export class PatientDescriptionListComponent implements OnInit {
  patinetDescriptions = null;
  currentUser;
  constructor(private patinetDescriptionService: PatinetDescriptionService, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.user.subscribe(x => {
      this.currentUser = x
      this.patinetDescriptionService.getAll()
        .pipe(first())
        .subscribe(patinetDescriptions => {
          debugger
          if (this.currentUser.userRole == 'Patient') { this.patinetDescriptions = patinetDescriptions.filter(d => d.patientId == this.currentUser.id); }
          else { this.patinetDescriptions = patinetDescriptions }
        });
    });

  }

  deletePatientDescription(id: string) {
    const description = this.patinetDescriptions.find(x => x.id === id);
    description.isDeleting = true;
    this.patinetDescriptionService.delete(id)
      .pipe(first())
      .subscribe(() => this.patinetDescriptions = this.patinetDescriptions.filter(x => x.id !== id));
  }
}
