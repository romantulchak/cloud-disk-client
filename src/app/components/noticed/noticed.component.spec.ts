import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticedComponent } from './noticed.component';

describe('NoticedComponent', () => {
  let component: NoticedComponent;
  let fixture: ComponentFixture<NoticedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
