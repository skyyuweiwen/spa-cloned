import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Address, Cart, DeliveryModeList, OccConfig } from '../../occ';
import { OccCartDeliveryAdapter } from './occ-cart-delivery.adapter';
import { ConverterService } from '../../util/converter.service';
import {
  DELIVERY_ADDRESS_NORMALIZER,
  DELIVERY_ADDRESS_SERIALIZER,
  DELIVERY_MODE_NORMALIZER,
} from '@spartacus/core';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
  site: {
    baseSite: '',
  },
};

describe('OccCartDeliveryAdapter', () => {
  let service: OccCartDeliveryAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartDeliveryAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCartDeliveryAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('create an address for cart', () => {
    it('should create address for cart for given user id, cart id and address', () => {
      const mockAddress: Address = {
        firstName: 'Mock',
        lastName: 'Address',
      };

      let result;
      service
        .createAddress(userId, cartId, mockAddress)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/addresses/' +
              'delivery'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockAddress);
      expect(result).toEqual(mockAddress);
      expect(converter.pipeable).toHaveBeenCalledWith(
        DELIVERY_ADDRESS_NORMALIZER
      );
      expect(converter.convert).toHaveBeenCalledWith(
        mockAddress,
        DELIVERY_ADDRESS_SERIALIZER
      );
    });
  });

  describe('set an address for cart', () => {
    it('should set address for cart for given user id, cart id and address id', () => {
      const mockAddressId = 'mockAddressId';

      let result;
      service
        .setAddress(userId, cartId, mockAddressId)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/addresses/' +
              'delivery'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('addressId')).toEqual(mockAddressId);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });

  describe('get all supported delivery modes for cart', () => {
    it('should get all supported delivery modes for cart for given user id and cart id', () => {
      const mockDeliveryModes: DeliveryModeList = {
        deliveryModes: [{ name: 'mockDeliveryMode' }],
      };
      let result;
      service
        .getSupportedModes(userId, cartId)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/deliverymodes'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockDeliveryModes);
      expect(result).toEqual(mockDeliveryModes.deliveryModes);
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        DELIVERY_MODE_NORMALIZER
      );
    });
  });

  describe('get delivery mode for cart', () => {
    it('should delivery modes for cart for given user id and cart id', () => {
      let result;
      service.getMode(userId, cartId).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/deliverymode'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
      expect(converter.pipeable).toHaveBeenCalledWith(DELIVERY_MODE_NORMALIZER);
    });
  });

  describe('set delivery mode for cart', () => {
    it('should set modes for cart for given user id, cart id and delivery mode id', () => {
      const mockDeliveryModeId = 'mockDeliveryModeId';

      let result;
      service
        .setMode(userId, cartId, mockDeliveryModeId)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/deliverymode'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('deliveryModeId')).toEqual(
        mockDeliveryModeId
      );
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
