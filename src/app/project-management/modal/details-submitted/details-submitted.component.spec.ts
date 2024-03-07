import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubmittedComponent } from './details-submitted.component';

describe('DetailsSubmittedComponent', () => {
  let component: DetailsSubmittedComponent;
  let fixture: ComponentFixture<DetailsSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSubmittedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
