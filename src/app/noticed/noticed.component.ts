import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';
import { Context } from '../model/context.model';
import { ContextEnum } from '../model/enum/context.enum';
import { DriveService } from '../service/drive.service';
import { NoticedService } from '../service/noticed.service';

@Component({
  selector: 'app-noticed',
  templateUrl: './noticed.component.html',
  styleUrls: ['./noticed.component.scss']
})
export class NoticedComponent implements OnInit {

  constructor(private noticedService: NoticedService,
              private driveService: DriveService) { }
  public source: MatTableDataSource<FolderDTO | FileDTO> = new MatTableDataSource();

  ngOnInit(): void {
    this.getNoticedElements();
    this.initContext();
  }

  private initContext(){
    let context = new Context(ContextEnum.NOTICED);
    this.driveService.contextSubject.next(context);
  }

  private getNoticedElements(){
    this.noticedService.getNoticedElements().subscribe(
      res=>{
        this.source.data = res;
      }
    );
  }
}
