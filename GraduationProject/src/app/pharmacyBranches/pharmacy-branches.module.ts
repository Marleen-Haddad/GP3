import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PharmacyBranchesRoutingModule } from './pharmacy-branches-routing.module';
import { LayoutComponent } from './layout.component';
import { PharmacyBranchesListComponent } from './pharmacybranchesList.component';
import { PharmacyBranchesAddEditComponent } from './pharmacy-branches-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PharmacyBranchesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        PharmacyBranchesListComponent,
        PharmacyBranchesAddEditComponent
    ]
})
export class PharmacyBranchesModule { }
