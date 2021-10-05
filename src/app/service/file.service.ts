import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class FileService{

    constructor(private http: HttpClient){}

    public uploadFileIntoFolder(file: File, folderLink: string): Observable<any>{
        const req = this.sendRequest('upload-into-folder', folderLink, file);
        return this.http.request(req);
    }

    public uploadFileIntoDrive(file: File, driveName: string):Observable<any>{
        const req = this.sendRequest('upload-into-drive', driveName, file);
        return this.http.request(req);
    }

    public deleteFile(fileLink: string): Observable<any>{
        return this.http.delete(`${API_URL}files/delete-file/${fileLink}`);
    }

    private sendRequest(endPoint: string, name: string, file: File): HttpRequest<FormData>{
        const formData = new FormData();
        formData.append("file", file);
        const req = new HttpRequest('POST', `${API_URL}files/${endPoint}/${name}`, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return req;
    }

}