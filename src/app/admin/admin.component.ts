import { Component } from '@angular/core';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isLoggedIn = false
  members: Member[] = [];
  ;

  constructor(private router: Router,
    private authService: AuthComponent,
    private memberService: MemberService) {
  }

  ngOnInit() {
    if (this.memberService.isAuthenticated()) {
      this.isLoggedIn = true
      this.loadMembers();
    } else {
      this.isLoggedIn = false
      this.router.navigate(['/login'])
    }
  }

  loadMembers() {
    this.memberService.getAllMembers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => console.error('Error fetching members:', err),
    });
  }

  deleteMember(email: string) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(email).subscribe({
        next: () => {
          var loggedInEmail = localStorage.getItem('loggedInEmail')
          if(email == loggedInEmail) {
            this.authService.logout()
          } else {
            this.loadMembers()
          }
          console.log('Member deleted successfully');
        },
        error: (err) => console.error('Error deleting member:', err),
      });
    }
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
        this.loadMembers();
        console.log('Member updated successfully');
      },
      error: (err) => console.error('Error deleting member:', err),
    });
  }

  isAdmin(member: Member) {
    if(member.roles == null) {
      return false;
    }
    return member.roles.includes('ADMIN')
  }

  cancelEdit(member: any) {
    member.isEditing = false;
  }
}
