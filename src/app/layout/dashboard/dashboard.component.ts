import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { DashboardData } from '../../_models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Card
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardData: DashboardData | null = null;

  constructor() {
    
  }

  ngOnInit() {
    this.dashboardData = {
      email: localStorage.getItem('email') != null ?localStorage.getItem('email') : '',
      name: localStorage.getItem('name'),
      role: ''
    } 
  }
}
