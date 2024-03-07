import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSwitchgearComponent } from './add-switchgear.component';

describe('AddSwitchgearComponent', () => {
  let component: AddSwitchgearComponent;
  let fixture: ComponentFixture<AddSwitchgearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSwitchgearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSwitchgearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
