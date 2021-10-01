import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Context } from '../model/context.model';
import { ContextEnum } from '../model/enum/context.enum';
import { DriveService } from '../service/drive.service';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss']
})
export class CreateFolderDialogComponent implements OnInit {

  public folderName: string = "Untitled";
  private driveName: string;
  private context: Context;

  constructor(private driveService: DriveService,
              private folderService: FolderService) {
 
  }

  ngOnInit(): void {
    this.getContext();
    this.getDrive();
  }

  private getContext() {
    this.driveService.contextSubject.subscribe(
      res => {
        this.context = res;
      });
  }

  private getDrive() {
    this.driveService.getDrive().then(
      res => {
        this.driveName = res;
      }
    );
  }

  public createFolder() {
    switch (this.context.context) {
      case ContextEnum.DRIVE:
        this.createFolderInDrive();
        break;
      case ContextEnum.FOLDER:
        this.createSubFolder();
        break;
    }


  }


  private createFolderInDrive() {
    this.folderService.createFolder(this.driveName, this.folderName).subscribe(
      res => {
        if(res != null){
          this.folderService.folderSubject.next(res);
        }
      }
    );
  }
  private createSubFolder() {
    this.folderService.createSubFolder(this.folderName, this.context.data).subscribe(
      res => {
        if(res != null){
          this.folderService.folderSubject.next(res);
        }
      }
    );
  }
}
