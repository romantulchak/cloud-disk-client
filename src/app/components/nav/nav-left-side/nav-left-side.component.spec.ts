import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLeftSideComponent } from './nav-left-side.component';

describe('NavLeftSideComponent', () => {
  let component: NavLeftSideComponent;
  let fixture: ComponentFixture<NavLeftSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavLeftSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
