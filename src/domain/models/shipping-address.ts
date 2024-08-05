
export class ShippingAddress {
  id: string;
  phone: string;
  address: string;
  deparment: string;
  city: string;

  constructor (id: string, phone: string, address: string, deparment: string, city: string) {
    this.id = id
    this.phone = phone;
    this.address = address;
    this.deparment = deparment;
    this.city = city;
  }
}