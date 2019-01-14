import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGuardianComponent } from './ngx-guardian.component';

describe('NgxGuardianComponent', () => {
  let component: NgxGuardianComponent;
  let fixture: ComponentFixture<NgxGuardianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxGuardianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
