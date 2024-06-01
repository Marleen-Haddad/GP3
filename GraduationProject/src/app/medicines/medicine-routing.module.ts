import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { MedicinesListComponent } from './medicineList.component';
import { MedicinesAddEditComponent } from './medicine-add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: MedicinesListComponent },
            { path: 'add', component: MedicinesAddEditComponent },
            { path: 'edit/:id', component: MedicinesAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicinesRoutingModule { }
