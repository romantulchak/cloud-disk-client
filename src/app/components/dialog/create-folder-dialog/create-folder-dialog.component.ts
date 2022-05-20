import {Component, OnInit} from '@angular/core';
import {Context} from '../../../model/context.model';
import {ContextEnum} from '../../../model/enum/context.enum';
import {DriveService} from '../../../service/drive.service';
import {FolderService} from '../../../service/folder.service';
import {FolderDTO} from "../../../dto/folder.dto";
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-folder-dialog',
  templateUrl: './create-folder-dialog.component.html',
  styleUrls: ['./create-folder-dialog.component.scss'],
})
export class CreateFolderDialogComponent implements OnInit {

  public folderName: string = "Untitled folder";
  private driveName: string;
  private context: Context;

  constructor(private dialog: MatDialogRef<CreateFolderDialogComponent, CreateFolderDialogComponent>,
              private driveService: DriveService,
              private folderService: FolderService,
              private router: Router) {

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
      case ContextEnum.NOTICED:
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
      folder.url = this.getUrlForFolderDestination();
      this.folderService.folderSubject.next(folder);
      this.dialog.close();
    }
  }

  private getUrlForFolderDestination(): string{
    switch (this.context.context) {
      case ContextEnum.NOTICED:
        return '/drive/my-drive';
      default:
        return this.router.url;
    }
  }
}
