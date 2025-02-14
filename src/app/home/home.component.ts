import { Component, OnInit, inject } from '@angular/core';
import { MemberService } from '../_services/member.service';
import { Member } from '../_models/member';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  isLoggedIn = false
  members: Member[] = [];
  private memberService: MemberService;

  constructor(private router: Router, private authService: AuthComponent) {
    this.memberService = inject(MemberService);
  }

  ngOnInit() {
    if(this.memberService.isAuthenticated()) {
      this.isLoggedIn = true
      this.loadMember();
    } else {
      this.isLoggedIn = false
      this.router.navigate(['/login'])
    }
  }

  loadMember() {
    var email = localStorage.getItem('email')

    this.memberService.getMemberByEmail(email).subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => console.error('Error fetching members:', err),
    });
  }
 
  editMember(member: Member) {
    member.isEditing = true;
     this.members.map(m =>
      m.email === member.email ? { ...m, isEditing: true } : member
    );
  }

  saveMember(member: any) {
    member.isEditing = false;
    this.memberService.editMember(member).subscribe({
      next: () => {
        this.loadMember();
        console.log('Member updated successfully');
      },
      error: (err) => console.error('Error deleting member:', err),
    });
  }

  cancelEdit(member: any) {
    member.isEditing = false;
  }
}
