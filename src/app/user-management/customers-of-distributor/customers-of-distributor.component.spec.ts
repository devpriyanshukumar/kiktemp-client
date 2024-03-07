import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersOfDistributorComponent } from './customers-of-distributor.component';

describe('CustomersOfDistributorComponent', () => {
  let component: CustomersOfDistributorComponent;
  let fixture: ComponentFixture<CustomersOfDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersOfDistributorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersOfDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
