import { Observable } from 'rxjs';
import { Address, DeliveryMode } from '../../../occ/occ-models/occ.models';

export abstract class CartDeliveryAdapter {
  /**
   * Abstract method used to create address in cart
   *
   * @param userId
   * @param cartId
   * @param address
   */
  abstract createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address>;

  /**
   * Abstract method used to set adress for delivery
   *
   * @param userId
   * @param cartId
   * @param addressId
   */
  abstract setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any>;

  /**
   * Abstract method used to set delivery mode on cart
   *
   * @param userId
   * @param cartId
   * @param deliveryModeId
   */
  abstract setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any>;

  /**
   * Abstract method used to get current delivery mode from cart
   *
   * @param userId
   * @param cartId
   */
  abstract getMode(userId: string, cartId: string): Observable<DeliveryMode>;

  /**
   * Abstract method used to get supported delivery modes for cart
   *
   * @param userId
   * @param cartId
   */
  abstract getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]>;
}
