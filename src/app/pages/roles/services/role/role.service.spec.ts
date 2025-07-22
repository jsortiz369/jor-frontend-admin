import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';

import { RoleService } from './role.service';
import { RoleAllReponse } from '../../interfaces/role.interface';

describe('RoleService', () => {
  let service: RoleService;
  let httpMock: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [RoleService, { provide: HttpClient, useValue: spy }, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RoleService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validate params all roles by table in lazy loading', () => {
    expect(() => service.findAllByLazy('' as any)).toThrowError('The parameter sent is not of type RoleParamDataTable');
    expect(() => service.findAllByLazy({ sort: 'prueba' } as any)).toThrowError('sort must be one of: name | createdAt | updatedAt | status');
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: null } as any)).toThrowError('sortOrder must be one of: ASC | DESC');
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: 'ASC', page: '' } as any)).toThrowError('page type number');
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: 'ASC', page: -1 } as any)).toThrowError('page min is 1');
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: 'ASC', page: 1, limit: '' } as any)).toThrowError('limit type number');
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: 'ASC', page: 1, limit: -1 } as any)).toThrowError('limit min is 1');
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: 'ASC', page: 1, limit: 200 } as any)).toThrowError('limit max 100');
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: 'ASC', page: 1, limit: 1, search: null } as any)).toThrowError(
      'search type string',
    );
    expect(() => service.findAllByLazy({ sort: 'name', sortOrder: 'ASC', page: 1, limit: 10, search: 'prueba' })).not.toThrowError();
  });

  it(`validate HTTP find all role (should handle a 500 server error)`, (done) => {
    const mockError = new HttpErrorResponse({
      error: 'Server failed',
      status: 500,
      statusText: 'Internal Server Error',
    });

    service.findAllByLazy({ sort: 'createdAt' }).subscribe({
      next: () => fail('Se esperaba que fallara la petición'),
      error: (error) => {
        expect(error.status).toBe(mockError.status);
        expect(error.statusText).toBe(mockError.statusText);
        done();
      },
    });

    const req = httpMock.expectOne('http://localhost:8000/api/v1/admin/roles?sort=createdAt');
    req.flush(mockError.error, {
      status: mockError.status,
      statusText: mockError.statusText,
    });
  });

  it(`validate HTTP find all role (should handle a 200 OK)`, (done) => {
    const mockRoles: RoleAllReponse = {
      meta: {
        page: 1,
        total: 3,
        lastPage: 1,
      },
      data: [
        {
          _id: '5d4c5241-4d06-4d28-ac19-082053479521',
          name: 'admin',
          createdAt: '2025-07-14T11:23:00.000Z',
          status: '1',
        },
        {
          _id: '375c5768-c391-496d-9fe2-8d54e05a635b',
          name: 'supervisor',
          createdAt: '2025-07-14T11:23:00.000Z',
          status: '0',
        },
        {
          _id: '292cef4b-e0ba-49e1-a994-4bde574f236e',
          name: 'cliente',
          createdAt: '2025-07-14T11:23:00.000Z',
          status: '1',
        },
      ],
    };

    service.findAllByLazy({ sort: 'createdAt' }).subscribe({
      next: (data) => {
        expect(data).toEqual(mockRoles);
        done();
      },
      error: (error) => fail(error),
    });

    const req = httpMock.expectOne('http://localhost:8000/api/v1/admin/roles?sort=createdAt');
    expect(req.request.method).toBe('GET');
    req.flush(mockRoles);
  });

  afterEach(() => {
    httpMock.verify(); // verifica que no haya peticiones pendientes
  });
});
