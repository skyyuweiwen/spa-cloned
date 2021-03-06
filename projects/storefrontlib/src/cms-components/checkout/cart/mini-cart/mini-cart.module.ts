import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CartModule,
  CmsConfig,
  ConfigModule,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/index';
import { MiniCartComponent } from './mini-cart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CartModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: { selector: 'cx-mini-cart' },
      },
    }),
    UrlModule,
    IconModule,
  ],
  declarations: [MiniCartComponent],
  entryComponents: [MiniCartComponent],
})
export class MiniCartModule {}
