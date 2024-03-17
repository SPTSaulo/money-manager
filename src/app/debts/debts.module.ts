import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebtsRoutingModule } from './debts-routing.module';
import { DebtsComponent } from './debts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';

@NgModule({
  declarations: [
    DebtsComponent
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
    DebtsRoutingModule
  ]
})
export class DebtsModule { }
