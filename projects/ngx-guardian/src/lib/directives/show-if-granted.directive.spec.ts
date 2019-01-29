import { TestBed } from '@angular/core/testing';
import { EditPizzaComponent } from '../../mocks/components/edit-pizza.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxGuardianModule } from '../ngx-guardian.module';
import { ngxGuardianConfig } from '../../mocks/manager/config';

describe('ShowIfGrantedDirective', () => {

  let fixture;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ EditPizzaComponent ],
      imports: [ NgxGuardianModule.forRoot(ngxGuardianConfig) ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(EditPizzaComponent);
    fixture.detectChanges();
  });

  it('should show <input> block when user has "READ" permission over "FOO"', () => {
    const input: HTMLElement = fixture.nativeElement.querySelector('.granted');
    expect(input).toBeTruthy();
  });

  it('should not show <input> block when user has not "UNKNOWN" permission over "FOO"', () => {
    const input: HTMLElement = fixture.nativeElement.querySelector('.noGranted');
    expect(input).toBeFalsy();
  });

});
