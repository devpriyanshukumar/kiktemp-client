import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRequestSuccessModalComponent } from './signup-request-success-modal.component';

describe('SignupRequestSuccessModalComponent', () => {
  let component: SignupRequestSuccessModalComponent;
  let fixture: ComponentFixture<SignupRequestSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupRequestSuccessModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupRequestSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
