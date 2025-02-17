import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAssignComponent } from './permission-assign.component';

describe('PermissionAssignComponent', () => {
  let component: PermissionAssignComponent;
  let fixture: ComponentFixture<PermissionAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionAssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
