import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, Matches, ValidateNested } from "class-validator";

export class CustomerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;
}

export class ShippingAddressDto {
 
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  deparment: string;

  @IsNotEmpty()
  city: string;
}

export class CreditCardDto {
  @IsNotEmpty()
  number: string;

  @Matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
    message: 'El valor coincide con el patrón prohibido (MM/YY).',
  })
  @IsNotEmpty()
  expiry: string;

  @IsNotEmpty()
  cvc: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cuotes: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class PaymentDto {
  
  @ValidateNested()
  @Type(() => CustomerDto)
  @IsNotEmpty()
  customer: CustomerDto

  @ValidateNested()
  @Type(() => ShippingAddressDto)
  @IsNotEmpty()
  shippingAddress: ShippingAddressDto

  @ValidateNested()
  @Type(() => CreditCardDto)
  @IsNotEmpty()
  creditCard: CreditCardDto
}