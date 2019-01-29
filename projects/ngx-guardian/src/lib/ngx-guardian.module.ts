import { NgModule } from '@angular/core';
import { NgxGuardianComponent } from './ngx-guardian.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgxGuardianService } from './ngx-guardian.service';
import { ShowIfGrantedDirective } from './directives/show-if-granted.directive';
import { DisableIfNoGrantedDirective } from './directives/disable-if-no-granted.directive';
import { NgxGuardianConfig } from './config';
import { NgxGuardianNavigateToRouteGuard } from './ngx-guardian-navigate-to-route.guard';

@NgModule({
  declarations: [
    NgxGuardianComponent,
    ShowIfGrantedDirective,
    DisableIfNoGrantedDirective
  ],
  providers: [
    NgxGuardianService,
    NgxGuardianNavigateToRouteGuard
  ],
  imports: [
  ],
  exports: [
    NgxGuardianComponent,
    ShowIfGrantedDirective,
    DisableIfNoGrantedDirective
  ]
})
export class NgxGuardianModule {
  static forRoot(config: NgxGuardianConfig): ModuleWithProviders {
    return {
      ngModule: NgxGuardianModule,
      providers: [
        {
          provide: NgxGuardianConfig,
          useValue: config
        }
      ]
    };
  }
}
