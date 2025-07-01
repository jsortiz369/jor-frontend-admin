import { inject, Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Confirm } from '../../interfaces/alert.interface';
import { confirmSchema } from '../../schemes/alert.scheme';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly _confirmationService$ = inject(ConfirmationService);
  private readonly _messageService$ = inject(MessageService);

  constructor() {}

  confirm(data: Confirm) {
    // validate that data complies with the typing
    this.isConfirm(data);

    this._confirmationService$.confirm({ ...data });
  }

  clearToast(key: string) {
    if (typeof key !== 'string') throw new Error('clearToast only accepts string value');
    this._messageService$.clear(key);
  }

  private isConfirm(data: Confirm) {
    if (typeof data !== 'object' || data == null) throw new Error('The parameter sent is not of type Confirm');

    const result = confirmSchema.safeParse(data);
    const errors = result.error?.errors ?? [];
    errors.forEach((error) => {
      throw new Error(error.message);
    });
  }
}
