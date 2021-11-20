import { StoreDTO } from "../dto/store.dto";
import { ContextType } from "./enum/contextType.enum";

export class Uploader {
  public file: File;
  public value: number = 0;
  public uploaded: boolean;
  public totalElements: number;
  public element: StoreDTO;
  public error: {
      isError: boolean,
      message: string
  };

  constructor(file: File, value: number, uploaded: boolean, totalElements: number = 1, context: ContextType = ContextType.FILE){
      this.file = file;
      this.value = value;
      this.uploaded = uploaded;
      this.totalElements = totalElements;
      this.element = new StoreDTO();
      this.element.context = context;
  }
}
