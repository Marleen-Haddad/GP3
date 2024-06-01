import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PharmacyMedicinesRoutingModule } from './pharmacy-medicines-routing.module';
import { LayoutComponent } from './layout.component';
import { PharmacyMedicinesListComponent } from './pharmacymedicinesList.component';
import { PharmacyMedicinesAddEditComponent } from './pharmacy-medicines-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PharmacyMedicinesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        PharmacyMedicinesListComponent,
        PharmacyMedicinesAddEditComponent
    ]
})
export class PharmacyMedicinesModule { }
