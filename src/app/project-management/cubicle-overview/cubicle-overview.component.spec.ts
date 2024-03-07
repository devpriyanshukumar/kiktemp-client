import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubicleOverviewComponent } from './cubicle-overview.component';

describe('CubicleOverviewComponent', () => {
  let component: CubicleOverviewComponent;
  let fixture: ComponentFixture<CubicleOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubicleOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubicleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
