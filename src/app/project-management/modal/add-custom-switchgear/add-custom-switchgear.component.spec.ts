import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomSwitchgearComponent } from './add-custom-switchgear.component';

describe('AddCustomSwitchgearComponent', () => {
  let component: AddCustomSwitchgearComponent;
  let fixture: ComponentFixture<AddCustomSwitchgearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomSwitchgearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomSwitchgearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
