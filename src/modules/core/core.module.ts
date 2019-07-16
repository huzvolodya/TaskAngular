import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
      HttpModule,
      HttpClientModule
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    // Guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // this guy could also be in users-list module, at least for now
        // since it's not being used anywhere else in the app
        ApiService,
      ]
    };
  }
}
