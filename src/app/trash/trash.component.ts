import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';
import { Context } from '../model/context.model';
import { ContextEnum } from '../model/enum/context.enum';
import { DriveService } from '../service/drive.service';
import { FileService } from '../service/file.service';
import { FolderService } from '../service/folder.service';
import { TrashService } from '../service/trash.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  public elements: MatTableDataSource<FolderDTO | FileDTO> = new MatTableDataSource();
  private driveName: string;

  constructor(private driveService: DriveService,
              private fileService: FileService,
              private folderService: FolderService,
              private trashService: TrashService) { }

  ngOnInit(): void {
    this.getDriveName();

  }

  private getDriveName(){
    this.driveService.getDrive().then(
      res=>{
        this.driveName = res;
        this.getRemovedElements();
      }
    );
  }

  private getRemovedElements(){
    this.folderService.getRemovedElements(this.driveName).subscribe(
      res=>{
        this.elements.data = res;
      }
    );
  }

  public removeFile(element: FolderDTO | FileDTO){
        this.fileService.deleteFile(element.link).subscribe(
      res => {
        // this.source.data = this.source.data.filter(f => f.id !== element.id);
        console.log(res);
      }
    );
  }

}
