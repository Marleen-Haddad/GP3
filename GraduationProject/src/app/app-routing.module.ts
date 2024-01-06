import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const pharmaciesModule = () => import('./pharmacies/pharmacies.module').then(x => x.PharmaciesModule);
const pharmacyBranchesModule = () => import('./pharmacyBranches/pharmacy-branches.module').then(x => x.PharmacyBranchesModule);
const medicinesModule = () => import('./medicines/medicine.module').then(x => x.MedicinesModule);
const pharmacyMedicinesModule = () => import('./pharmacyMedicines/pharmacy-medicines.module').then(x => x.PharmacyMedicinesModule);

const patientDescriptionModule = () => import('./patientDescriptions/patientDescription.module').then(x => x.PatientDescriptionModule);
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'pharmacies', loadChildren: pharmaciesModule, canActivate: [AuthGuard] },
    { path: 'pharmacyBranches', loadChildren: pharmacyBranchesModule, canActivate: [AuthGuard] },
    { path: 'medicines', loadChildren: medicinesModule, canActivate: [AuthGuard] },
    { path: 'pharmacyMedicines', loadChildren: pharmacyMedicinesModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'patientDescription', loadChildren: patientDescriptionModule },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
