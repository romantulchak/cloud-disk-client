import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDialogComponent } from './access-dialog.component';

describe('AccessDialogComponent', () => {
  let component: AccessDialogComponent;
  let fixture: ComponentFixture<AccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
