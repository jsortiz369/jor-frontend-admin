import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { ConfirmationService } from 'primeng/api';

describe('AlertService', () => {
  let service: AlertService;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;

  beforeEach(() => {
    const confirmationSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    TestBed.configureTestingModule({
      providers: [AlertService, { provide: ConfirmationService, useValue: confirmationSpy }],
    });
    service = TestBed.inject(AlertService);
    confirmationService = TestBed.inject(ConfirmationService) as jasmine.SpyObj<ConfirmationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validate the parameter is of type Confirm', () => {
    expect(() => service.confirm(1 as any)).toThrowError('The parameter sent is not of type Confirm');
    expect(() => service.confirm(true as any)).toThrowError('The parameter sent is not of type Confirm');
    expect(() => service.confirm(null as any)).toThrowError('The parameter sent is not of type Confirm');
    expect(() => service.confirm(undefined as any)).toThrowError('The parameter sent is not of type Confirm');
  });

  it('validate key Confirm', () => {
    expect(() => service.confirm({} as any)).toThrowError('message is requerid');
    expect(() => service.confirm({ message: null } as any)).toThrowError('message type string');
    expect(() => service.confirm({ message: '', key: null } as any)).toThrowError('key type string');
    expect(() => service.confirm({ message: '', icon: null } as any)).toThrowError('icon type string');
    expect(() => service.confirm({ message: '', header: null } as any)).toThrowError('header type string');
    expect(() => service.confirm({ message: '', accept: null } as any)).toThrowError('accept type function');
    expect(() => service.confirm({ message: '', reject: null } as any)).toThrowError('reject type function');
    expect(() => service.confirm({ message: '', acceptVisible: null } as any)).toThrowError('acceptVisible type boolean');
    expect(() => service.confirm({ message: '', rejectVisible: null } as any)).toThrowError('rejectVisible type boolean');

    // validate key acceptButtonProps
    expect(() => service.confirm({ message: '', acceptButtonProps: null } as any)).toThrowError('acceptButtonProps type object');
    expect(() => service.confirm({ message: '', acceptButtonProps: {} } as any)).toThrowError('label is requerid');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: true } } as any)).toThrowError('label type string');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', severity: 'prueba' } } as any)).toThrowError(
      `severity type 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast'`,
    );
  });

  /*  it('debería llamar a confirmationService.confirm con la data correcta', () => {
    const acceptSpy = jasmine.createSpy('accept');
    const rejectSpy = jasmine.createSpy('reject');

    const data: any = {
      hola: 'prueba',
      message: '¿Estás seguro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: acceptSpy,
      reject: rejectSpy, *
    };

    service.confirm(data);
    expect(confirmationService.confirm).toHaveBeenCalledWith(data);
  }); */

  /* it('debería contener los campos necesarios en la configuración', () => {
    const accept = jasmine.createSpy('accept');
    const config: Confirm = {
      message: '¿Seguro?',
      header: 'Confirmar',
      accept,
    };

    service.confirm(config);
    const calledConfig = confirmationService.confirm.calls.mostRecent().args[0];
    expect(calledConfig.message).toBe('¿Seguro?');
    expect(calledConfig.header).toBe('Confirmar');
    expect(typeof calledConfig.accept).toBe('function');
  }); */
});
