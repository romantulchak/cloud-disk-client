import { DriveDTO } from "./drive.dto";
import { FileDTO } from "./file.dto";
import { UserDTO } from "./user.dto";

export class FolderDTO{
    public id: number;

    public name: string;

    public subFolders: FolderDTO[];

    public drive: DriveDTO;

    public link: string;

    public createAt: Date;

    public uploadAt: Date;

    public owner: UserDTO;

    public hasLinkAccess: boolean;

    public files: FileDTO[];
}