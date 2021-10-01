import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderToolbarComponent } from './folder-toolbar.component';

describe('FolderToolbarComponent', () => {
  let component: FolderToolbarComponent;
  let fixture: ComponentFixture<FolderToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
