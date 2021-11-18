import { DriveDTO } from "./drive.dto";
import { RoleDTO } from "./role.dto";

export class UserDTO{
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public password: string;
    public roles: RoleDTO[];
    public drive: DriveDTO;
}