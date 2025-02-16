import { Role } from "./role.model";

export class User {
    id!: string;
    name!: string;
    email!: string;
    active!: boolean;
    locked!: boolean;
    userType!: string;
    roles!: Role[];
    isEditing!: boolean;
}