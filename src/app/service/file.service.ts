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

    public uploadFiles(file: File, folderLink: string): Observable<any>{
        const formData = new FormData();
        formData.append("file", file);
        // for (let i = 0; i < files.length; i++) {
        //     formData.append('file', files[i]);
        // }
        const req = new HttpRequest('POST', `${API_URL}files/upload-into-folder/${folderLink}`, formData, {
            reportProgress: true,
            responseType: 'json'
        })
        return this.http.request(req);
    }

}