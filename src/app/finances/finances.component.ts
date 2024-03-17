import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/date.service';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

export interface Finance {
  title: string;
  amount: number;
  description: string;
  type: string;
  date: Date;
}

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss',
})
export class FinancesComponent implements OnInit, OnDestroy {
  items: Finance[];
  visible: boolean = false;
  form: FormGroup;
  options = [
    {
      label: 'Gasto',
      value: 'expense',
    },
    {
      label: 'Ingreso',
      value: 'income',
    },
  ];

  private subscription: Subscription;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscription = this.dataService.finances.subscribe({
      next: (data) => (this.items = data),
    });
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      type: ['expense', [Validators.required]],
      description: [null],
      amount: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    const item = this.form.value as Finance;
    item.date = new Date();
    this.items.unshift(item);
    localStorage.setItem('finances', JSON.stringify(this.items));
    this.dataService.finances.next(this.items);
    this.form.reset()
    this.visible = false;
  }

  onDeleteItem(index: number) {
    this.items.splice(index, 1);
    this.items = [...this.items];
    this.dataService.finances.next(this.items);
    localStorage.setItem('finances', JSON.stringify(this.items));
  }

  getBalance() {
    const balance = this.items.reduce((balance, item) => {
      if (item.type === 'expense') {
        return balance - item.amount;
      } else if (item.type === 'income') {
        return balance + item.amount;
      }
      return balance;
    }, 0);
    return balance.toFixed(2);
  }

}
