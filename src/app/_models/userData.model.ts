import { Role } from "./role.model";

export class UserData {
    userId!: string;
    name!: string;
    email!: string;
    token!: string;
    userType!: string;
    permissions!: string[];
    roles!: Role[];
    passwordResetRequired!: boolean;
}