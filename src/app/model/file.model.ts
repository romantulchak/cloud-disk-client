import { Drive } from "./drive.model";
import { Folder } from "./folder.model";

export class File{
    public id: number;
    public name: string;
    public createAt: Date;
    public uploadAt: Date;
    public size: number;
    public folder: Folder;
    public drive: Drive;
    public link: string;
    public hasLinkAccess: boolean;
}