import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectOverviewComponent } from './update-project-overview.component';

describe('UpdateProjectOverviewComponent', () => {
  let component: UpdateProjectOverviewComponent;
  let fixture: ComponentFixture<UpdateProjectOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProjectOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
