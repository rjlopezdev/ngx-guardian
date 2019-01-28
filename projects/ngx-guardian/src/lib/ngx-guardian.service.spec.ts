import { TestBed } from '@angular/core/testing';
import { NgxGuardianConfig } from '../lib/config';
import { ngxGuardianConfig } from '../mocks/manager/config';
import { NgxGuardianService } from './ngx-guardian.service';
import { NgxGuardianRole } from '../mocks/manager/roles';
import { defaultManager } from '../mocks/manager/default-manager';

describe('NgxGuardianService instantiation', () => {

  let service: any = NgxGuardianService;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NgxGuardianService,
      {
        provide: NgxGuardianConfig,
        useValue: ngxGuardianConfig
      }
    ]
  }));

  it('#loadConfig should be created', () => {
    service = TestBed.get(NgxGuardianService);
    expect(service).toBeTruthy();
  });

  it('#loadConfig should be created with default manager role name equals to "DEFAULT"', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            defaultRole: NgxGuardianRole.DEFAULT,
          }
        }
      ]
    });
    service = TestBed.get(NgxGuardianService);
    expect(service.currentManager.role.name).toBe('DEFAULT');
  });

  it('#loadConfig should be created with default manager equals to "undefined"', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ]
          }
        }
      ]
    });
    service = TestBed.get(NgxGuardianService);
    expect(service.currentManager).toBeUndefined();
  });

  it('#loadConfig should be created with @unauthorizedRoute equals to "/no-auth" when unauthorizedRoute provided is no provided', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ]
          }
        }
      ]
    });
    service = TestBed.get(NgxGuardianService);
    expect(service.unauthorizedRoute).toBe('/no-auth');
  });

  it(`#loadConfig should be created with @unauthorizedRoute equals to "/custom-no-auth"
  when unauthorizedRoute provided is "/custom-no-auth"`, () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            unauthorizedRoute: '/custom-no-auth'
          }
        }
      ]
    });
    service = TestBed.get(NgxGuardianService);
    expect(service.unauthorizedRoute).toBe('/custom-no-auth');
  });

  it('#loadConfig should be created with @noGrantedRoute equals to "no-granted" when noGrantedRoute is no provided', () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ]
          }
        }
      ]
    });
    service = TestBed.get(NgxGuardianService);
    expect(service.noGrantedRoute).toBe('/no-granted');
  });

  it(`#loadConfig should be created with @noGrantedRoute equals to "custom-no-granted"
   when noGrantedRoute provided is "custom-no-granted"`, () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            noGrantedRoute: '/custom-no-granted'
          }
        }
      ]
    });
    service = TestBed.get(NgxGuardianService);
    expect(service.noGrantedRoute).toBe('/custom-no-granted');
  });

  it(`#loadConfig should throw Error "No managers provided" when config.managers is an empty list`, () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: []
          }
        }
      ]
    });
    expect(() => TestBed.get(NgxGuardianService)).toThrow(new Error('No managers provided'));
  });

  it(`#loadConfig should throw Error "No managers provided" when config.managers is no provided`, () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {}
        }
      ]
    });
    expect(() => TestBed.get(NgxGuardianService)).toThrow(new Error('No managers provided'));
  });

  it(`#loadConfig should console.warn "No manager found in localStorage."
  when config.setFromStorage is true and no localStorage is set`, () => {
    spyOn(console, 'warn');
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            setFromStorage: true
          }
        }
      ]
    });
    localStorage.clear();
    service = TestBed.get(NgxGuardianService);
    expect(console.warn).toHaveBeenCalledWith(`No manager found in localStorage.`);
  });

  it(`#loadConfig should set defaultManager whose role name is "DEFAULT" when setFromStorage equals to true"`, () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            setFromStorage: true
          }
        }
      ]
    });
    localStorage.setItem('ngx-guardian-role', 'DEFAULT');
    service = TestBed.get(NgxGuardianService);
    expect(service.currentManager.role.name).toBe('DEFAULT');
  });

  it(`#loadConfig should throw Error "No manager set for role: FOO" when setFromStorage equals to true"
  and value for <ngx-guardian-role> is not a valid role`, () => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            setFromStorage: true
          }
        }
      ]
    });
    localStorage.setItem('ngx-guardian-role', 'FOO');
    expect(() => TestBed.get(NgxGuardianService)).toThrow(new Error(`No manager set for role: FOO`));
  });

  it(`#loadConfig should console.warn "No manager found for role: <FOO>" when setFromStorage equals to "false"
  and defaultRole equals to "FOO"`, () => {
    spyOn(console, 'warn');
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            defaultRole: 'FOO'
          }
        }
      ]
    });
    TestBed.get(NgxGuardianService);
    expect(console.warn).toHaveBeenCalledWith(`No manager found for role: <FOO>`);
  });
});

describe('NgxGuardianService granting permission', () => {

  let service: NgxGuardianService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
      NgxGuardianService,
      {
        provide: NgxGuardianConfig,
        useValue: {
          managers: [
            defaultManager
          ],
          defaultRole: NgxGuardianRole.DEFAULT
        }
      }
    ]
    });
    service = TestBed.get(NgxGuardianService);
  });

  // TODO: implement when manager be able to support permission with no action provided
  xit('#isGranted should return "true" when @resource equals to "FOO" and @action is no provided', () => {
    expect(service).toBeTruthy();
  });

  // TODO: implement when manager be able to support permission with no action provided
  xit('#isGranted should return "false" @resource equals to "UNKNOWN" and @action is no provided', () => {
    expect(service).toBeTruthy();
  });

  // TODO: implement when manager be able to support permission with no action provided
  xit('#isGranted should return "false" when @action equals to @resource equals to "UNKNOWN"', () => {
    expect(service).toBeTruthy();
  });

  it('#isGranted should return "true" when @action equals to "CREATE" and @resource equals to "FOO"', () => {
    expect(service.isGranted('FOO', 'CREATE')).toBeTruthy();
  });

  it('#isGranted should return "true" when @action equals to "READ" and @resource equals to "FOO"', () => {
    expect(service.isGranted('FOO', 'READ')).toBeTruthy();
  });

  it('#isGranted should return "false" when @action equals to "UNKNOWN" and @resource equals to "FOO"', () => {
    expect(service.isGranted('FOO', 'UNKNOWN')).toBeFalsy();
  });

  it('#isGranted should return "false" when @action equals to null and @resource equals to "FOO"', () => {
    expect(service.isGranted('FOO', null)).toBeFalsy();
  });

  it('#isGranted should return "false" when @action equals to "READ" and @resource equals to "null"', () => {
    expect(service.isGranted(null, 'READ')).toBeFalsy();
  });

  it('#isGranted should return "false" when @action equals to "null" and @resource equals to "null"', () => {
    expect(service.isGranted(null, null)).toBeFalsy();
  });

  it('#isGranted should should return false if user is granted but manager is disabled', () => {
    spyOn(console, 'warn');
    service.disableManager();
    service.isGranted(null, null);
    expect(service.isGranted('FOO', 'READ')).toBeFalsy();
  });
});

describe('NgxGuardianService disabling manager', () => {

  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgxGuardianService,
        {
          provide: NgxGuardianConfig,
          useValue: {
            managers: [
              defaultManager
            ],
            defaultRole: NgxGuardianRole.DEFAULT,
          }
        }
      ]
    });
    service = TestBed.get(NgxGuardianService);
  });

  it('#disableManager defaultManager should be enabled when set with valid config', () => {
    expect(service.isEnabled).toBeTruthy();
  });

  it('#disableManager defaultManager should be disabled', () => {
    service.disableManager();
    expect(service.isEnabled).toBeFalsy();
  });

});
