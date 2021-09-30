import { Drive } from "./drive.model";
import { File } from "./file.model";
import { User } from "./user.model";

export class Folder{
    public id: number;
    public name: string;
    public subFolders: Folder[];
    public drive: Drive;
    public link: string;
    public createAt: Date;
    public uploadAt: Date;
    public owner: User;
    public hasLinkAccess: boolean;
    public files: File[];
}