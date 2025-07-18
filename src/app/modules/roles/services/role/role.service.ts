import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError, timer } from 'rxjs';

import { environment } from '../../../../../environments/environment.development';
import { RoleAllReponse, RoleParamDataTable } from '../../interfaces/role.interface';
import { roleAllResponseScheme, roleParamDataTableScheme } from '../../shemes/role.scheme';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly _http$ = inject(HttpClient);
  private readonly _url$ = `${environment.urlBase}/roles`;
  private readonly _time$ = environment.timeRequest;

  constructor() {}

  findAllByLazy(filter: RoleParamDataTable): Observable<RoleAllReponse> {
    const filterValidate = this.validatefindAllByLazyScheme(filter); // validate the scheme complies

    return this._http$.get<RoleAllReponse>(this._url$, { params: filterValidate, observe: 'body' }).pipe(
      map((res: RoleAllReponse) => roleAllResponseScheme.parse(res)),
      catchError((err: HttpErrorResponse) => timer(this._time$).pipe(switchMap(() => throwError(() => err)))),
    );
  }

  private validatefindAllByLazyScheme(data: RoleParamDataTable): RoleParamDataTable {
    if (typeof data !== 'object') throw new Error('The parameter sent is not of type RoleParamDataTable');

    const result = roleParamDataTableScheme.safeParse(data);
    const errors = result.error?.errors ?? [];
    errors.forEach((error) => {
      throw new Error(error.message);
    });

    if (result.success == false) throw new Error(`Data parameter is invalid`);
    return result.data!;
  }
}
