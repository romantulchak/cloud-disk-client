import { FileDTO } from "../dto/file.dto";
import { FolderDTO } from "../dto/folder.dto";

export class Download{
  public file: FolderDTO | FileDTO;
  public value: number;
  public downloaded: boolean;
  public type: number = -1;
  public error: {
      isError: boolean,
      message: string
  };

  constructor(value: number, downloaded: boolean, file: FolderDTO | FileDTO){
      this.value = value;
      this.downloaded = downloaded;
      this.file = file;
  }
}