import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromLeft'
})
export class FromLeftPipe implements PipeTransform {
  transform(startTime: string): string {
    const minutes = new Date(startTime).getMinutes();
    const percentage = (minutes / 60) * 100;
    return `${percentage.toFixed(2)}%`;
  }
}
