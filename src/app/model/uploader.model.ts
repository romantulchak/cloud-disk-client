import { Folder } from "./folder.model";

export class Uploader {
  public file: File;
  public value: number = 0;
  public uploaded: boolean;
  public totalElements: number;
  public error: {
      isError: boolean,
      message: string
  };

  constructor(file: File, value: number, uploaded: boolean, totalElements: number = 1){
      this.file = file;
      this.value = value;
      this.uploaded = uploaded;
      this.totalElements = totalElements;
  }
}
