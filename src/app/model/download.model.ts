export class Download{
  public value: number;
  public downloaded: boolean;
  public type: number = -1;
  public error: {
      isError: boolean,
      message: string
  };

  constructor(value: number, downloaded: boolean){
      this.value = value;
      this.downloaded = downloaded;
  }
}