import { Drive } from "./drive.model";
import { Role } from "./role.model";

export class User{
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public password: string;
    public roles: Role[];
    public drive: Drive;
}