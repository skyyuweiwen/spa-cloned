import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { ConfigModule, Config } from '../../config/config.module';
import { RoutingConfig } from './config/routing-config';
import { defaultRoutingConfig } from './config/default-routing-config';

export function initConfigurableRoutes(
  service: ConfigurableRoutesService
): () => void {
  const result = () => service.init(); // workaround for AOT compilation (see https://stackoverflow.com/a/51977115)
  return result;
}

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultRoutingConfig)],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfigurableRoutes,
      deps: [ConfigurableRoutesService],
      multi: true,
    },
    { provide: RoutingConfig, useExisting: Config },
  ],
})
export class ConfigurableRoutesModule {}
