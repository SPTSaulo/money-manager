import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Finance } from "../finances/finances.component";
import { Debt } from "../debts/debts.component";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    
    public finances = new BehaviorSubject<Finance[]>([])
    public debts = new BehaviorSubject<Debt[]>([])
    
    constructor() {
        this.finances.next(JSON.parse(localStorage.getItem('finances')) ?? [])
        this.debts.next(JSON.parse(localStorage.getItem('debts')) ?? [])
    }
}