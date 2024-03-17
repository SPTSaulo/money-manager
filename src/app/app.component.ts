import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menu: MenuItem[] = [
    {
      label: 'Finanzas',
      icon: 'pi pi-fw pi-file',
      routerLink: '/finances'
    },
    {
      label: 'Deudas',
      icon: 'pi pi-fw pi-money-bill',
      routerLink: '/debts'
    },
    {
      label: 'Monitor',
      icon: 'pi pi-fw pi-chart-line',
      routerLink: '/monitor'
    }
  ];
}
