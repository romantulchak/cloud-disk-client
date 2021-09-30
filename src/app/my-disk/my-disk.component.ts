import { Component, OnInit } from '@angular/core';
import { FolderDTO } from '../dto/folder.dto';
import { Folder } from '../model/folder.model';
import { DriveService } from '../service/drive.service';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-my-disk',
  templateUrl: './my-disk.component.html',
  styleUrls: ['./my-disk.component.scss']
})
export class MyDiskComponent implements OnInit {

  constructor(private driveService: DriveService,
              private folderSerivce: FolderService) { }

  private driveName: string;
  
  public folders: FolderDTO[];
  public displayedColumns: string[] = ['name', 'owner', 'lastChanged', 'size'];
  public currentFolderId: number;
  public isSelected: boolean = false;

  ngOnInit(): void {
    this.getUserDrive();
  }

  private getUserDrive(){
    this.driveService.getDrive().then(res=>{
      this.driveName = res;
      this.getFolders();
    });
  }

  private getFolders(){
    this.folderSerivce.findAllFoldersForDrive(this.driveName).subscribe(
      res=>{
        console.log(res);
        this.folders = res;
      }
    );
  }

  public open(){
    console.log("Open");
  }

  public selectElement(element: FolderDTO){
    this.currentFolderId = element.id;
    this.isSelected = !this.isSelected;
  }
} 
