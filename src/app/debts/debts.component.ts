import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from '../services/date.service';

export interface Debt {
  title: string,
  amount: number,
  debtor: string,
  type: string
}

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrl: './debts.component.scss'
})
export class DebtsComponent implements OnInit, OnDestroy {
  items: Debt[];
  visible: boolean = false;
  form: FormGroup;
  options = [
    {
      label: 'Me debe',
      value: 'owe',
    },
    {
      label: 'Debo',
      value: 'pay',
    },
  ];

  private subscription: Subscription;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subscription = this.dataService.debts.subscribe({
      next: (data) => (this.items = data),
    });
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      type: ['owe', [Validators.required]],
      debtor: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    const item = this.form.value as Debt;
    this.items.unshift(item);
    localStorage.setItem('debts', JSON.stringify(this.items));
    this.dataService.debts.next(this.items);
    this.form.reset()
    this.visible = false;
  }

  onDeleteItem(index: number) {
    this.items.splice(index, 1);
    this.items = [...this.items];
    this.dataService.debts.next(this.items);
    localStorage.setItem('debts', JSON.stringify(this.items))
  }

  getBalance() {
    const balance = this.items.reduce((balance, item) => {
      if (item.type === 'owe') {
        return balance + item.amount;
      } else if (item.type === 'pay') {
        return balance - item.amount;
      }
      return balance;
    }, 0);
    return balance.toFixed(2)
  }
}
