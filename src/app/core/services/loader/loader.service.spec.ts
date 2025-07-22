import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('only boolean values are allowed', () => {
    expect(() => service.setVisible('' as any)).toThrowError('setVisible only accepts boolean value');
  });

  it('visible must return a boolean', () => {
    service.setVisible(true);
    expect(typeof service.visible).toBe('boolean');
  });

  it('should be initially false', () => {
    expect(service.visible).toBeFalse();
  });

  it('must be true the visible', () => {
    service.setVisible(true);
    expect(service.visible).toBeTrue();
  });
});
