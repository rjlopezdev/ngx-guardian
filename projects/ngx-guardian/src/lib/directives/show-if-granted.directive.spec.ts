import { ShowIfGrantedDirective } from './show-if-granted.directive';
import { TestBed } from '@angular/core/testing';
import { EditPizzaComponent } from '../../mocks/edit-pizza.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxGuardianService } from '../ngx-guardian.service';

xdescribe('ShowIfGrantedDirective', () => {

  let fixture;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ EditPizzaComponent, ShowIfGrantedDirective],
      providers: [NgxGuardianService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(EditPizzaComponent);
    fixture.detectChanges();
  });

  it('should show <input> block', () => {
    const input: HTMLElement = fixture.nativeElement.querySelector('.blockToManage');
    expect(input).toBeTruthy();
  });
});
