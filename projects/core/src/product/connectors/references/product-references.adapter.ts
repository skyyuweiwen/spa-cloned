import { Observable } from 'rxjs';
// import { ProductReference } from '../../../occ/occ-models/occ.models';
import { UIProductReference } from '../../model/product-reference-list';

export abstract class ProductReferencesAdapter {
  /**
   * Abstract method used to load product references for a given product.
   * References can be loaded from alternative sources, as long as the structure
   * converts to the `ProductReference[]`.
   *
   * @param productCode The `productCode` for given product
   * @param referenceType Reference type according to enum ProductReferenceTypeEnum
   * @param pageSize Maximum number of product refrence to load
   */
  abstract load(
    productCode: string,
    referenceType?: string,
    pageSize?: number
  ): Observable<UIProductReference[]>;
}