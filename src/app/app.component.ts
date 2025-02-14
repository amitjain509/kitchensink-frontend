import { Component } from '@angular/core';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  imports: [AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kitchen-sink-3';
}
