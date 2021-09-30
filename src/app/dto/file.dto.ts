import { DriveDTO } from "./drive.dto";
import { FolderDTO } from "./folder.dto";

export class FileDTO{
    
    public id: number;

    public name: string;

    public createAt: Date;

    public uploadAt: Date;

    public size: number;

    public folder: FolderDTO;

    public drive: DriveDTO;

    public link: string;
}