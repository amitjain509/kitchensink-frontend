import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionAssignComponent } from './role-permission-assign.component';

describe('RolePermissionAssignComponent', () => {
  let component: RolePermissionAssignComponent;
  let fixture: ComponentFixture<RolePermissionAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermissionAssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolePermissionAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
