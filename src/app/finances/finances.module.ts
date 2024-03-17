import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancesComponent } from './finances.component';
import { FinancesRoutingModule } from './finances-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { SpeedDialModule } from 'primeng/speeddial';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FinancesComponent
  ],
  imports: [
    CommonModule,
    DataViewModule,
    SpeedDialModule,
    FieldsetModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    FinancesRoutingModule
  ]
})
export class FinancesModule { }
