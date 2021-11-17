import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySidenavComponent } from './property-sidenav.component';

describe('PropertySidenavComponent', () => {
  let component: PropertySidenavComponent;
  let fixture: ComponentFixture<PropertySidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertySidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
