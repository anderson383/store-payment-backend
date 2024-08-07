
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ShippingAddressEntity } from '../../entity/shipping-address.entity';
import { ShippingAddressDto } from 'src/application/comanders/dtos/shipping-address.dto';
import { ShippingAddress } from 'src/domain/models/shipping-address';
import { ShippingAddressRepository } from 'src/domain/ports/billing/repository/shipping-address.repository';

export class ShippingAddressService implements ShippingAddressRepository{
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}
  
  async create(customerData: ShippingAddressDto): Promise<ShippingAddress> {
    const result = await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(ShippingAddressEntity)
      .values({
        address: customerData.address,
        city: customerData.city,
        deparment: customerData.deparment,
        phone: customerData.phone,
        customerId: customerData.customerId,
        productId: customerData.productId
      })
      .returning('*')
      .execute();

    const insertCust = result.raw[0];
    return new ShippingAddress(insertCust.id, insertCust.phone, insertCust.address, insertCust.deparment, insertCust.city);
  }
}
