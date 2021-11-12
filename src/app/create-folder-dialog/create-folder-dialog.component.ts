import {Component, OnInit} from '@angular/core';
import {Context} from '../model/context.model';
import {ContextEnum} from '../model/enum/context.enum';
import {DriveService} from '../service/drive.service';
import {FolderService} from '../service/folder.service';
import {FolderDTO} from "../dto/folder.dto";

@Component({
  selector: 'app-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss']
})
export class CreateFolderDialogComponent implements OnInit {

  public folderName: string = "Untitled folder";
  private driveName: string;
  private context: Context;

  constructor(private driveService: DriveService,
              private folderService: FolderService) {

  }

  ngOnInit(): void {
    this.getContext();
    this.getDrive();
  }

  private getContext(): void {
    this.driveService.contextSubject.subscribe(
      res => {
        this.context = res;
      });
  }

  private getDrive(): void {
    this.driveService.getDrive().then(
      res => {
        this.driveName = res;
      }
    );
  }

  public createFolder(): void {
    switch (this.context.context) {
      case ContextEnum.DRIVE:
        this.createFolderInDrive();
        break;
      case ContextEnum.FOLDER:
        this.createSubFolder();
        break;
    }
  }

  private createFolderInDrive(): void {
    this.folderService.createFolder(this.driveName, this.folderName).subscribe(
      res => {
        this.updateFoldersInTable(res);
      }
    );
  }

  private createSubFolder(): void {
    this.folderService.createSubFolder(this.folderName, this.context.data).subscribe(
      res => {
        this.updateFoldersInTable(res);
      }
    );
  }

  private updateFoldersInTable(folder: FolderDTO): void {
    if (folder != null) {
      this.folderService.folderSubject.next(folder);
    }
  }
}
