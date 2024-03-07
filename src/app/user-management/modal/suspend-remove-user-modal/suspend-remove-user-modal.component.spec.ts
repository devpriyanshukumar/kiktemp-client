import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendRemoveUserModalComponent } from './suspend-remove-user-modal.component';

describe('SuspendRemoveUserModalComponent', () => {
  let component: SuspendRemoveUserModalComponent;
  let fixture: ComponentFixture<SuspendRemoveUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendRemoveUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendRemoveUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
