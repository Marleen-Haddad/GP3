import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { PharmacyBranchesListComponent } from './pharmacybranchesList.component';
import { PharmacyBranchesAddEditComponent } from './pharmacy-branches-add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PharmacyBranchesListComponent },
            { path: 'add', component: PharmacyBranchesAddEditComponent },
            { path: 'edit/:id', component: PharmacyBranchesAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PharmacyBranchesRoutingModule { }
