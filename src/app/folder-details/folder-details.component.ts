import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';
import {Context} from '../model/context.model';
import {ContextEnum} from '../model/enum/context.enum';
import {DriveService} from '../service/drive.service';
import {FolderService} from '../service/folder.service';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.scss'],
})
export class FolderDetailsComponent implements OnInit, OnDestroy {

  private folderLink: string;
  public folders: MatTableDataSource<FolderDTO | FileDTO> = new MatTableDataSource();

  constructor(private driveService: DriveService,
              private folderService: FolderService,
              private activatedRouter: ActivatedRoute) {
                
  }

  ngOnInit(): void {
    this.getSubFolders();
  }

  private getSubFolders(): void {
    this.activatedRouter.params.subscribe(
      res => {
        this.folderLink = res.link;
        this.initContext();
        this.getSubFoldersInFolder();
      }
    );
  }

  private initContext(): void {
    let context = new Context(ContextEnum.FOLDER, this.folderLink);
    this.driveService.contextSubject.next(context);
  }

  private getSubFoldersInFolder(): void {
    this.folderService.findSubFoldersInFolder(this.folderLink).subscribe(
      res => {
        this.folders.data = res;
      }
    );
  }

  ngOnDestroy(): void {
    this.folders.data = [];
  }
}
