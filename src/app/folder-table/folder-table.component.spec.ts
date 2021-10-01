import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderTableComponent } from './folder-table.component';

describe('FolderTableComponent', () => {
  let component: FolderTableComponent;
  let fixture: ComponentFixture<FolderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
