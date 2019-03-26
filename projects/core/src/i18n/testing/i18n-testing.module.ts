import { NgModule } from '@angular/core';
import { MockTranslatePipe } from './mock-translate.pipe';
import { TranslationService } from '../translation.service';
import { MockTranslationService } from './mock-translation.service';

@NgModule({
  declarations: [MockTranslatePipe],
  exports: [MockTranslatePipe],
  providers: [{ provide: TranslationService, useClass: MockTranslationService }]
})
export class I18nTestingModule {}
