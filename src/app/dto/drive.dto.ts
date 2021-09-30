import { FileDTO } from "./file.dto";
import { FolderDTO } from "./folder.dto";
import { PlanDTO } from "./plan.dto";
import { UserDTO } from "./user.dto";

export class DriveDTO{
    public id: number;
    public name: string;
    public folders: FolderDTO[];
    public createAt: Date;
    public owner: UserDTO;
    public plan: PlanDTO;
    public files: FileDTO[];
}