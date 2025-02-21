import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucFirst',
  standalone: true
})
export class UcFirstPipe implements PipeTransform {
  transform(value?: string): string {
    if (value) {
      return value.charAt(0).toUpperCase();
    }
    return value || '';
  }
}
