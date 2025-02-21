import { Permission } from "./permission.model";

export class Role {
    roleId!: string;
    roleName!: string;
    roleDescription!: string;
    permissions!: Permission[];
}