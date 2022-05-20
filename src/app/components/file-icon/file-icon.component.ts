import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { FileDTO } from '../../dto/file.dto';
import { FolderDTO } from '../../dto/folder.dto';
import { StoreDTO } from '../../dto/store.dto';
import { UploadHistoryDTO } from '../../dto/uploadHistory.dto';
import { ContextType } from '../../model/enum/contextType.enum';
import {FileType} from '../../model/enum/fileType.enum';
import { FileExtensionPipe } from '../../pipe/file-extension.pipe';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss']
})
export class FileIconComponent implements OnInit {

  @Input("extension") extension: string;
  @Input("element") element: FolderDTO | FileDTO;
  @Input("iconSize") iconSize: string = '24px';

  public fileType: FileType = new FileType();
  public contextType = ContextType;

  constructor(private fileExtensionPipe: FileExtensionPipe) {
  }

  ngOnInit(): void {
  }

  public isFileImageExists(): boolean {
    return this.fileType.FILE_TYPES.find(element => element.type.includes(this.extension)) != null;
  }

  public getColor(): string{
    return (this.element as FolderDTO).color;
  }
}
