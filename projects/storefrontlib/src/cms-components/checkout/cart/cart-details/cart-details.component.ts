import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CartService, UICart, UIOrderEntry } from '@spartacus/core';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-details',
  templateUrl: './cart-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailsComponent implements OnInit {
  cart$: Observable<UICart>;
  entries$: Observable<UIOrderEntry[]>;
  cartLoaded$: Observable<boolean>;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.getActive();
    this.entries$ = this.cartService
      .getEntries()
      .pipe(filter(entries => entries.length > 0));
    this.cartLoaded$ = this.cartService.getLoaded();
  }

  getAllPromotionsForCart(cart: UICart): UICart[] {
    const potentialPromotions = cart.potentialOrderPromotions || [];
    const appliedPromotions = cart.appliedOrderPromotions || [];
    return [...potentialPromotions, ...appliedPromotions];
  }
}
