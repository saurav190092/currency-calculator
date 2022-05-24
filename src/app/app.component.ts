import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  amount: any = 0;

  //TODO::Need to make it dynamic.
  currency_symbols:any = {
    USD: '$', // US Dollar
    EUR: '€', // Euro
    CRC: '₡', // Costa Rican Colón
    GBP: '£', // British Pound Sterling
    ILS: '₪', // Israeli New Sheqel
    INR: '₹', // Indian Rupee
    JPY: '¥', // Japanese Yen
    KRW: '₩', // South Korean Won
    NGN: '₦', // Nigerian Naira
    PHP: '₱', // Philippine Peso
    PLN: 'zł', // Polish Zloty
    PYG: '₲', // Paraguayan Guarani
    THB: '฿', // Thai Baht
    UAH: '₴', // Ukrainian Hryvnia
    VND: '₫', // Vietnamese Dong
  };

  selectedCurrency= '';
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.contactForm = this.fb.group({
      amount: [null],
      currencyFrom: ['INR'],
      currencyTo: ['USD'],
    });
  }

  submit() {
    this.currencyService.getCurrency().subscribe(
      (res: any) => {
        this.displayResults(res, this.contactForm.value);
        console.log(res.rates, 'res');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  displayResults(currency:any, form:any) {
    let fromRate = currency.rates[form.currencyFrom];
    let toRate = currency.rates[form.currencyTo];
    this.amount = ((toRate / fromRate) * form.amount).toFixed(2);
    this.selectedCurrency = this.currency_symbols[form.currencyTo]
      ? this.currency_symbols[form.currencyTo]
      : '$';
  }
}
