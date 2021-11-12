import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameDialogComponent } from './rename-dialog.component';

describe('RenameDialogComponent', () => {
  let component: RenameDialogComponent;
  let fixture: ComponentFixture<RenameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
