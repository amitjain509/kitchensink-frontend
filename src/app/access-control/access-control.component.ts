import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-access-control',
  imports: [
    TabViewModule,
    RouterOutlet,
],
  templateUrl: './access-control.component.html',
  styleUrl: './access-control.component.scss'
})
export class AccessControlComponent {
  activeIndex: number = 0;
}
