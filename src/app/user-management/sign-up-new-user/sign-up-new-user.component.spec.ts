import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpNewUserComponent } from './sign-up-new-user.component';

describe('SignUpNewUserComponent', () => {
  let component: SignUpNewUserComponent;
  let fixture: ComponentFixture<SignUpNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpNewUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
