import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';
import {Context} from '../model/context.model';
import {ContextEnum} from '../model/enum/context.enum';
import {DriveService} from '../service/drive.service';
import {ElementService} from '../service/element.service';
import {FolderService} from '../service/folder.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit, OnDestroy {

  public elements: MatTableDataSource<FolderDTO | FileDTO> = new MatTableDataSource();
  private driveName: string;

  constructor(private driveService: DriveService,
              private folderService: FolderService,
              private elementService: ElementService) {
  }

  ngOnInit(): void {
    this.getDriveName();
    this.initContext();
  }

  private initContext(): void {
    let context = new Context(ContextEnum.TRASH);
    this.driveService.contextSubject.next(context);
  }

  private getDriveName(): void {
    this.driveService.getDrive().then(
      res => {
        this.driveName = res;
        this.getRemovedElements();
      }
    );
  }

  private getRemovedElements(): void {
    this.elementService.getRemovedElements(this.driveName).subscribe(
      res => {
        this.elements.data = res;
      }
    );
  }

  ngOnDestroy(): void {
    this.folderService.folderSubject.next(null);
    this.elements.data = [];
  }
}
