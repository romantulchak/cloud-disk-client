import { Component, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';
import { StoreDTO } from '../dto/store.dto';
import { Download } from '../model/download.model';
import { ContextEnum } from '../model/enum/context.enum';
import { ContextType } from '../model/enum/contextType.enum';
import { FolderColorType } from '../model/enum/folderColorType.enum';
import { FolderColor } from '../model/folderColor.model';
import { DriveService } from '../service/drive.service';
import { FolderService } from '../service/folder.service';
import { FunctionService } from '../service/function.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input('selectedElements') selectedElements: StoreDTO[];
  @Input('driveName') driveName: string;
  @Input('source') source: MatTableDataSource<FolderDTO | FileDTO>;
  @Input('element') element: FolderDTO;
  @Output('changeColor') changeColorEvent:EventEmitter<FolderDTO>= new EventEmitter();

  public context: string;
  public pageContext: string;
  public contextType = ContextType;
  public pageContextType = ContextEnum;
  public selectedColor: FolderColor;
  public colors: FolderColor[] = [];
  private filesCount: number = 0;
  private folderCount: number = 0;

  constructor(private functionService: FunctionService,
              private driveService: DriveService,
              private folderService: FolderService) { }

  ngOnInit(): void {
    this.getFilesContext();
    this.getPageContext();
  }

  public getColors(){
    if(this.colors.length === 0){
      Object.entries(FolderColorType).forEach(element =>{
        let name = element[0].replace(/_/g, ' ').toLocaleLowerCase();
        let isSelected = this.element.color === element[1];
        let folderColor = new FolderColor(name, element[1], isSelected);
        if(isSelected){
          this.selectedColor = folderColor;
        }
        this.colors.push(folderColor);
      });
    }
  }

  private getPageContext(){
    this.driveService.contextSubject.subscribe(
      res=>{
        this.pageContext = res.context;
      }
    );
  }

  private getFilesContext(){
    this.selectedElements.forEach(element => {
      if(element.context === this.contextType.FILE){
        this.filesCount++;
      }else{
        this.folderCount++;
      }
    });
    if(this.selectedElements.length === this.filesCount && this.folderCount === 0 || this.selectedElements.length === this.folderCount && this.filesCount === 0){
      this.context = this.selectedElements[0].context;
    }else{
      this.context = this.contextType.ANY;
    }
  }

  public download(){
    let downloadProgress: Download[] = [];
    this.selectedElements.forEach(element => {
      let download = new Download(0, false, element);
      downloadProgress.push(download);
    });
    this.functionService.download(downloadProgress);
  }

  public preRemove() {
    this.functionService.preRemove(this.selectedElements, this.driveName, this.source);
  }
  public fullRemove(){
    this.functionService.fullRemove(this.selectedElements, this.source);
  } 

  public restore(){
    this.functionService.restore(this.selectedElements, this.source);
  }

  public changeColor(color: FolderColor){
    this.folderService.changeFolderColor(this.element.link, color.value).subscribe(
      res=>{
        color.isSelected = true;
        this.selectedColor = color;
        this.element = res;
        this.changeColorEvent.emit(res);
      }
    );
  }
}
