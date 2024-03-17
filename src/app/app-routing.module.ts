import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'finances'
  },
  {
    path: 'debts',
    loadChildren: () => import('./debts/debts.module').then(m => m.DebtsModule)
  },
  {
    path: 'finances',
    loadChildren: () => import('./finances/finances.module').then(m => m.FinancesModule)
  },
  {
    path: 'monitor',
    loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
