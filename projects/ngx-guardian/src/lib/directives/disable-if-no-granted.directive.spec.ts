import { DisableIfNoGrantedDirective } from './disable-if-no-granted.directive';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxGuardianService } from '../ngx-guardian.service';
import { EatTacoComponent } from '../../mocks/components/eat-taco.component';
import { NgxGuardianModule } from '../ngx-guardian.module';
import { ngxGuardianConfig } from '../../mocks/manager/config';

describe('DisableIfNoGrantedDirective', () => {
  let fixture;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ EatTacoComponent ],
      imports: [ NgxGuardianModule.forRoot(ngxGuardianConfig) ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(EatTacoComponent);
    fixture.detectChanges();
  });

  it('should disable input', () => {
    const input: HTMLElement = fixture.nativeElement.querySelector('.blockToBeEnabled');
    expect(input.getAttribute('disabled')).toBeTruthy();
  });

  it('should not disable input', () => {
    const input: HTMLElement = fixture.nativeElement.querySelector('.blockToDisable');
    expect(input.getAttribute('disabled')).toBeTruthy();
  });
});
