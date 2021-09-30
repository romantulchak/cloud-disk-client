import { DriveDTO } from "./drive.dto";
import { RoleDTO } from "./role.dto";

export class UserDTO{
    private id: number;
    private firstName: string;
    private lastName: string;
    private username: string;
    private email: string;
    private password: string;
    private roles: RoleDTO[];
    private drive: DriveDTO;
}