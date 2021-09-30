import { Folder } from "./folder.model";
import { Plan } from "./plan.model";
import { User } from "./user.model";

export class Drive{
    public drive: number;
    public name: string;
    public folders: Folder[];
    public createAt: Date;
    public owner: User;
    public plan: Plan;
    public files: File[];

}