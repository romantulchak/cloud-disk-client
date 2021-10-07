import { Folder } from "./folder.model";

export class Uploader {
  public file: File;
  public value: number = 0;
  public uploaded: boolean;
  public error: {
      isError: boolean,
      message: string
  };

  constructor(file: File, value: number, uploaded: boolean){
      this.file = file;
      this.value = value;
      this.uploaded = uploaded;
  }
}
