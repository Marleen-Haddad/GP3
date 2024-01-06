import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PatinetDescriptionService } from '@app/_services';

@Component({ templateUrl: 'patientDescriptionList.component.html' })
export class PatientDescriptionListComponent implements OnInit {
  patinetDescriptions = null;

    constructor(private patinetDescriptionService: PatinetDescriptionService) {}

    ngOnInit() {
        this.patinetDescriptionService.getAll()
            .pipe(first())
            .subscribe(patinetDescriptions => this.patinetDescriptions = patinetDescriptions);
    }

    deletePatientDescription(id: string) {
        const description = this.patinetDescriptions.find(x => x.id === id);
        description.isDeleting = true;
        this.patinetDescriptionService.delete(id)
            .pipe(first())
            .subscribe(() => this.patinetDescriptions = this.patinetDescriptions.filter(x => x.id !== id));
    }
}
