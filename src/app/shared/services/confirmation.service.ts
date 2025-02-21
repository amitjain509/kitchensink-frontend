import { Injectable } from '@angular/core';
import { ConfirmationService as PrimeNgConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  constructor(private confirmationService: PrimeNgConfirmationService) {}

  confirm(options: {
    message: string;
    header?: string;
    icon?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    accept: () => void;
    reject?: () => void;
  }) {
    this.confirmationService.confirm({
      message: options.message,
      header: options.header || 'Confirmation',
      icon: options.icon || 'pi pi-exclamation-triangle',
      acceptLabel: options.acceptLabel || 'Yes',
      rejectLabel: options.rejectLabel || 'No',
      accept: options.accept,
      reject: options.reject || (() => {}),
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptButtonStyleClass: 'py-1 min-w-20',
      rejectButtonStyleClass: 'py-1 min-w-20',
      rejectButtonProps: { severity: 'secondary', variant: 'outlined' },
      blockScroll: true
    });
  }
}
