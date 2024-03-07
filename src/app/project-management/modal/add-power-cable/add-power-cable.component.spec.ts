import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPowerCableComponent } from './add-power-cable.component';

describe('AddPowerCableComponent', () => {
  let component: AddPowerCableComponent;
  let fixture: ComponentFixture<AddPowerCableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPowerCableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPowerCableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
