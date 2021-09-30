import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private driveService: DriveService,
              private folderService: FolderService) { }

  ngOnInit(): void {
    this.getDrive();
  }

  private getDrive(){
    this.driveService.getDrive().then(
      res=>{
        this.driveName = res;
      }
    );
  }

  public createFolder(){
    this.folderService.createFolder(this.driveName, this.folderName).subscribe(
      res=>{
        console.log("Ok");
        
      }
    );
  }

}
