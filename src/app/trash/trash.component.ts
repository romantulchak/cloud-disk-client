import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class TrashComponent implements OnInit, OnDestroy {

  public elements: MatTableDataSource<FolderDTO | FileDTO> = new MatTableDataSource();
  private driveName: string;

  constructor(private driveService: DriveService,
              private fileService: FileService,
              private folderService: FolderService,
              private trashService: TrashService) { }

  ngOnInit(): void {
    this.getDriveName();
    this.initContext();
  }

  private initContext(){
    let context = new Context(ContextEnum.TRASH);
    this.driveService.contextSubject.next(context);
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

  ngOnDestroy(){
    this.folderService.folderSubject.next(null);
    this.elements.data = [];
  }
}
