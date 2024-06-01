import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MedicinesRoutingModule } from './medicine-routing.module';
import { LayoutComponent } from './layout.component';
import { MedicinesListComponent } from './medicineList.component';
import { MedicinesAddEditComponent } from './medicine-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MedicinesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        MedicinesListComponent,
        MedicinesAddEditComponent
    ]
})
export class MedicinesModule { }
