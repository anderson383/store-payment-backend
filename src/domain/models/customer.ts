import { ShippingAddress } from "./shipping-address";

export class Customer {
  id: string;
  name: string;
  lastname: string;
  email: string;
  addressShipping: ShippingAddress[] = [];

  constructor(id: string, name: string, lastname: string, email: string) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
  }
}