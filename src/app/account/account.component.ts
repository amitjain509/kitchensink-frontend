import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {}
