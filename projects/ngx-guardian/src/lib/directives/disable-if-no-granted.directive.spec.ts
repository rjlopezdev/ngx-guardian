import { DisableIfNoGrantedDirective } from './disable-if-no-granted.directive';
import { TestBed } from '@angular/core/testing';
import { EditPizzaComponent } from '../../mocks/edit-pizza.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxGuardianService } from '../ngx-guardian.service';

xdescribe('DisableIfNoGrantedDirective', () => {
  let fixture;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ EditPizzaComponent, DisableIfNoGrantedDirective],
      providers: [NgxGuardianService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(EditPizzaComponent);
    fixture.detectChanges();
  });

  it('should disable input', () => {
    const input: HTMLElement = fixture.nativeElement.querySelector('blockToDisable');
    expect(input.getAttribute('disabled')).toBeTruthy();
  });
});
