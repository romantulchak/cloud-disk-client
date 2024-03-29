import {HttpClient, HttpParams, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import { FileDTO } from "../dto/file.dto";

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  public uploadFileIntoFolder(file: File, folderLink: string): Observable<any> {
    const req = this.sendRequest('upload-into-folder', folderLink, file);
    return this.http.request(req);
  }

  public uploadFileIntoDrive(file: File, driveName: string): Observable<any> {
    const req = this.sendRequest('upload-into-drive', driveName, file);
    return this.http.request(req);
  }

  public downloadFile(fileLink: string): Observable<any> {
    const req = new HttpRequest('GET', `${API_URL}files/download-file/${fileLink}`, {
      responseType: 'arrayBuffer',
      reportProgress: true
    });
    return this.http.request(req);
  }

  public findFilesInFolder(folderLink: string, page: string): Observable<FileDTO[]>{
    let params = new HttpParams()
                    .append('page', page);
    return this.http.get<FileDTO[]>(`${API_URL}files/${folderLink}`, {params: params});
  }

  private sendRequest(endPoint: string, name: string, file: File): HttpRequest<FormData> {
    const formData = new FormData();
    formData.append("file", file);
    return new HttpRequest('POST', `${API_URL}files/${endPoint}/${name}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

}
