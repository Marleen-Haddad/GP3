import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { PharmacyMedicinesListComponent } from './pharmacymedicinesList.component';
import { PharmacyMedicinesAddEditComponent } from './pharmacy-medicines-add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PharmacyMedicinesListComponent },
            { path: 'add', component: PharmacyMedicinesAddEditComponent },
            { path: 'edit/:id', component: PharmacyMedicinesAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PharmacyMedicinesRoutingModule { }
