import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHeaderUploadDownloadComponent } from './dialog-header-upload-download.component';

describe('DialogHeaderUploadDownloadComponent', () => {
  let component: DialogHeaderUploadDownloadComponent;
  let fixture: ComponentFixture<DialogHeaderUploadDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHeaderUploadDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHeaderUploadDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
