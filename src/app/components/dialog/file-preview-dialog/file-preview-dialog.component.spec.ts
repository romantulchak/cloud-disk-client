import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePreviewDialogComponent } from './file-preview-dialog.component';

describe('FilePreviewDialogComponent', () => {
  let component: FilePreviewDialogComponent;
  let fixture: ComponentFixture<FilePreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilePreviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
