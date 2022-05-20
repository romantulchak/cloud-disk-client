import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FileDTO} from '../../dto/file.dto';
import {FolderDTO} from '../../dto/folder.dto';
import {Context} from '../../model/context.model';
import {ContextEnum} from '../../model/enum/context.enum';
import {GridStyle} from '../../model/enum/gridStyle.enum';
import {DriveService} from '../../service/drive.service';
import {ElementService} from '../../service/element.service';

@Component({
  selector: 'app-my-disk',
  templateUrl: './my-disk.component.html',
  styleUrls: ['./my-disk.component.scss']
})
export class MyDiskComponent implements OnInit {

  constructor(private driveService: DriveService,
              private elementService: ElementService) {
  }

  private driveName: string;
  public folders: MatTableDataSource<FolderDTO | FileDTO> = new MatTableDataSource();
  public gridStyle = GridStyle;
  public style: string;

  ngOnInit(): void {
    this.getUserDrive();
  }

  private initContext(): void {
    let context = new Context(ContextEnum.DRIVE, this.driveName);
    this.driveService.contextSubject.next(context);
  }

  private getUserDrive(): void {
    this.driveService.getDrive().then(res => {
      this.driveName = res;
      this.getFolders();
      this.initContext();
    });
  }

  private getFolders(): void {
    this.elementService.findElementsForDrive(this.driveName).subscribe(
      res => {
        this.folders.data = res;
      }
    );
  }
}
