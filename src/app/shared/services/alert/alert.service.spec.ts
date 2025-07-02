import { TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';

import { AlertService } from './alert.service';
import { Confirm } from '../../interfaces/alert.interface';

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

  it('It should contain the necessary fields in the configuration.', () => {
    const accept = jasmine.createSpy('accept');
    const config: Confirm = {
      message: 'Are you sure?',
      header: 'Confirm',
      accept,
    };

    service.confirm(config);
    const calledConfig = confirmationService.confirm.calls.mostRecent().args[0];
    expect(calledConfig.message).toBe('Are you sure?');
    expect(calledConfig.header).toBe('Confirm');
    expect(typeof calledConfig.accept).toBe('function');
  });

  it('should call confirmationService.confirm with the correct data', () => {
    const acceptSpy = jasmine.createSpy('accept');
    const rejectSpy = jasmine.createSpy('reject');

    const data: Confirm = {
      message: 'Are you sure?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: acceptSpy,
      reject: rejectSpy,
    };

    service.confirm(data);
    expect(confirmationService.confirm).toHaveBeenCalledWith(data);
  });

  it('validate the parameter is of type Confirm', () => {
    expect(() => service.confirm(1 as any)).toThrowError('The parameter sent is not of type Confirm');
    expect(() => service.confirm(true as any)).toThrowError('The parameter sent is not of type Confirm');
    expect(() => service.confirm(null as any)).toThrowError('The parameter sent is not of type Confirm');
    expect(() => service.confirm(undefined as any)).toThrowError('The parameter sent is not of type Confirm');
  });

  it('validate key Confirm', () => {
    // key message
    expect(() => service.confirm({} as any)).toThrowError('message is requerid');
    expect(() => service.confirm({ message: undefined } as any)).toThrowError('message is requerid');
    expect(() => service.confirm({ message: null } as any)).toThrowError('message type string');
    expect(() => service.confirm({ message: true } as any)).toThrowError('message type string');
    expect(() => service.confirm({ message: {} } as any)).toThrowError('message type string');
    expect(() => service.confirm({ message: [] } as any)).toThrowError('message type string');
    expect(() => service.confirm({ message: '' })).not.toThrowError();

    // key key
    expect(() => service.confirm({ message: '', key: null } as any)).toThrowError('key type string');
    expect(() => service.confirm({ message: '', key: true } as any)).toThrowError('key type string');
    expect(() => service.confirm({ message: '', key: {} } as any)).toThrowError('key type string');
    expect(() => service.confirm({ message: '', key: [] } as any)).toThrowError('key type string');
    expect(() => service.confirm({ message: '', key: undefined } as any)).not.toThrowError();
    expect(() => service.confirm({ message: '', key: '' } as any)).not.toThrowError();

    // key icon
    expect(() => service.confirm({ message: '', icon: null } as any)).toThrowError('icon type string');
    expect(() => service.confirm({ message: '', icon: true } as any)).toThrowError('icon type string');
    expect(() => service.confirm({ message: '', icon: {} } as any)).toThrowError('icon type string');
    expect(() => service.confirm({ message: '', icon: [] } as any)).toThrowError('icon type string');
    expect(() => service.confirm({ message: '', icon: undefined } as any)).not.toThrowError();
    expect(() => service.confirm({ message: '', icon: '' } as any)).not.toThrowError();

    // key header
    expect(() => service.confirm({ message: '', header: null } as any)).toThrowError('header type string');
    expect(() => service.confirm({ message: '', header: true } as any)).toThrowError('header type string');
    expect(() => service.confirm({ message: '', header: {} } as any)).toThrowError('header type string');
    expect(() => service.confirm({ message: '', header: [] } as any)).toThrowError('header type string');
    expect(() => service.confirm({ message: '', header: undefined } as any)).not.toThrowError();
    expect(() => service.confirm({ message: '', header: '' } as any)).not.toThrowError();

    // key accept
    expect(() => service.confirm({ message: '', accept: null } as any)).toThrowError('accept type function');
    expect(() => service.confirm({ message: '', accept: true } as any)).toThrowError('accept type function');
    expect(() => service.confirm({ message: '', accept: {} } as any)).toThrowError('accept type function');
    expect(() => service.confirm({ message: '', accept: [] } as any)).toThrowError('accept type function');
    expect(() => service.confirm({ message: '', accept: undefined } as any)).not.toThrowError();
    expect(() => service.confirm({ message: '', accept: () => {} } as any)).not.toThrowError();

    // key reject
    expect(() => service.confirm({ message: '', reject: null } as any)).toThrowError('reject type function');
    expect(() => service.confirm({ message: '', reject: true } as any)).toThrowError('reject type function');
    expect(() => service.confirm({ message: '', reject: {} } as any)).toThrowError('reject type function');
    expect(() => service.confirm({ message: '', reject: [] } as any)).toThrowError('reject type function');
    expect(() => service.confirm({ message: '', reject: undefined } as any)).not.toThrowError();
    expect(() => service.confirm({ message: '', reject: () => {} } as any)).not.toThrowError();

    // key acceptVisible
    expect(() => service.confirm({ message: '', acceptVisible: null } as any)).toThrowError('acceptVisible type boolean');
    expect(() => service.confirm({ message: '', acceptVisible: '' } as any)).toThrowError('acceptVisible type boolean');
    expect(() => service.confirm({ message: '', acceptVisible: {} } as any)).toThrowError('acceptVisible type boolean');
    expect(() => service.confirm({ message: '', acceptVisible: [] } as any)).toThrowError('acceptVisible type boolean');
    expect(() => service.confirm({ message: '', acceptVisible: undefined } as any)).not.toThrowError();
    expect(() => service.confirm({ message: '', acceptVisible: true } as any)).not.toThrowError();

    // key rejectVisible
    expect(() => service.confirm({ message: '', rejectVisible: null } as any)).toThrowError('rejectVisible type boolean');
    expect(() => service.confirm({ message: '', rejectVisible: '' } as any)).toThrowError('rejectVisible type boolean');
    expect(() => service.confirm({ message: '', rejectVisible: {} } as any)).toThrowError('rejectVisible type boolean');
    expect(() => service.confirm({ message: '', rejectVisible: [] } as any)).toThrowError('rejectVisible type boolean');
    expect(() => service.confirm({ message: '', rejectVisible: undefined } as any)).not.toThrowError();
    expect(() => service.confirm({ message: '', rejectVisible: true } as any)).not.toThrowError();

    // validate key acceptButtonProps
    expect(() => service.confirm({ message: '', acceptButtonProps: null } as any)).toThrowError('acceptButtonProps type object');
    expect(() => service.confirm({ message: '', acceptButtonProps: {} } as any)).toThrowError('label is requerid');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: true } } as any)).toThrowError('label type string');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', prueba: 'prueba' } } as any)).toThrowError(
      `Additional fields are not allowed. Check the keys sent`,
    );
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', icon: null } } as any)).toThrowError('icon type string');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', outlined: null } } as any)).toThrowError('outlined type boolean');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', text: null } } as any)).toThrowError('text type boolean');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', rounded: null } } as any)).toThrowError('rounded type boolean');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', raised: null } } as any)).toThrowError('raised type boolean');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', styleClass: null } } as any)).toThrowError('styleClass type string');
    expect(() => service.confirm({ message: '', acceptButtonProps: { label: '', severity: 'prueba' } } as any)).toThrowError(
      `severity must be one of: success | info | warn | danger | help | primary | secondary | contrast`,
    );

    expect(() => service.confirm({ message: '', prueba: null } as any)).toThrowError('Additional fields are not allowed. Check the keys sent');
  });
});
