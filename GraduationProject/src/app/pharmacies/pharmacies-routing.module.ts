import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { PharmaciesListComponent } from './pharmaciesList.component';
import { PharmaciesAddEditComponent } from './pharmacies-add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PharmaciesListComponent },
            { path: 'add', component: PharmaciesAddEditComponent },
            { path: 'edit/:id', component: PharmaciesAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PharmaciesRoutingModule { }
