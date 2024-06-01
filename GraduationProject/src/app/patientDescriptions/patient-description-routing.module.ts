import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { PatientDescriptionListComponent } from './patientDescriptionList.component';
import { PatinetDescriptionsAddEditComponent } from './patient-description-add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PatientDescriptionListComponent },
            { path: 'add', component: PatinetDescriptionsAddEditComponent },
            { path: 'edit/:id', component: PatinetDescriptionsAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatinetDescriptionsRoutingModule { }
