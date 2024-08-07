import { IsNotEmpty } from "class-validator";

export class ShippingAddressDto {  
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  deparment: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  productId: string;
}