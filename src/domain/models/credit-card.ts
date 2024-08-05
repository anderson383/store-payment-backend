

export class CreditCard {
  private _number: string;
  private _cvc: string;
  private _exp_month: string;
  private _exp_year: string;
  private _card_holder: string;
  private _installments: string;
  private _amount: number;

  constructor (number: string, cvc: string, expiry: string, card_holder: string, installments: string, amount: number) {
    const [exp_month, exp_year] = expiry.split('/');
    this._number = number;
    this._card_holder = card_holder
    this._exp_month =exp_month;
    this._exp_year = exp_year;
    this._cvc = cvc;
    this._installments = installments;
    this._amount = amount;
  }


  getCreditCard() {
    return {
      number: this._number, // Número de la tarjeta
      cvc: this._cvc, // Código de seguridad de la tarjeta (3 o 4 dígitos según corresponda)
      exp_month: this._exp_month,// Mes de expiración (string de 2 dígitos)
      exp_year: this._exp_year,// Año expresado current 2 dígitos
      card_holder: this._card_holder // Nombre del tarjetahabiente
    }
  }

  get installments () {
    return this._installments
  }

  get amount () {
    return this._amount
  }
}