import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _visible$ = signal<boolean>(false);

  constructor() {}

  setVisible(value: boolean): void {
    if (typeof value !== 'boolean') throw new Error('setVisible only accepts boolean value');
    this._visible$.set(value);
  }

  get visible(): boolean {
    return this._visible$();
  }
}
