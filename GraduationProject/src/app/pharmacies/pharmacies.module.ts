import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PharmaciesRoutingModule } from './pharmacies-routing.module';
import { LayoutComponent } from './layout.component';
import { PharmaciesListComponent } from './pharmaciesList.component';
import { PharmaciesAddEditComponent } from './pharmacies-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PharmaciesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        PharmaciesListComponent,
        PharmaciesAddEditComponent
    ]
})
export class PharmaciesModule { }
