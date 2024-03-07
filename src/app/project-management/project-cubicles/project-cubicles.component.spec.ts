import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCubiclesComponent } from './project-cubicles.component';

describe('ProjectCubiclesComponent', () => {
  let component: ProjectCubiclesComponent;
  let fixture: ComponentFixture<ProjectCubiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCubiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCubiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
