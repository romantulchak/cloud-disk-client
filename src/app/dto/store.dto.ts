import { Context } from "../model/context.model";
import { Download } from "../model/download.model";
import { Access } from "./access.dto";
import { DriveDTO } from "./drive.dto";
import { LocalPath } from "./localPath.dto";
import { UserDTO } from "./user.dto";

export class StoreDTO{
    public id: number;
    public name: string;
    public drive: DriveDTO;
    public link: string;
    public createAt: Date;
    public uploadAt: Date;
    public owner: UserDTO;
    public hasLinkAccess: boolean;
    public context: string;
    public isSelected: boolean;
    public download: Download;
    public path: LocalPath;
    public noticed: boolean;
    public access: Access;
    public isOwner: boolean;
    public url: string;
    public oldName: string;
}