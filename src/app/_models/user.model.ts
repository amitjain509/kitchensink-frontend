import { Permission } from "./permission.model";
import { Role } from "./role.model";

export class User {
    userId!: string;
    name!: string;
    email!: string;
    active!: boolean;
    locked!: boolean;
    userType!: string;
    roles!: Role[];
    permissions!: Permission[];
    isEditing!: boolean;
    passwordResetRequired!: boolean;
}