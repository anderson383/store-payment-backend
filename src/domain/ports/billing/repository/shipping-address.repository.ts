import { ShippingAddressDto } from "src/application/comanders/dtos/shipping-address.dto";
import { ShippingAddress } from "src/domain/models/shipping-address";

export abstract class ShippingAddressRepository {
  abstract create(shippingAddress: ShippingAddressDto): Promise<ShippingAddress>;
}
