import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PatinetDescriptionsRoutingModule } from './patient-description-routing.module';
import { LayoutComponent } from './layout.component';
import { PatinetDescriptionsAddEditComponent } from './patient-description-add-edit.component';
import { PatientDescriptionListComponent } from './patientDescriptionList.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PatinetDescriptionsRoutingModule,

    ],
    declarations: [
        LayoutComponent,
        PatientDescriptionListComponent,
        PatinetDescriptionsAddEditComponent
    ]
})
export class PatientDescriptionModule { }
